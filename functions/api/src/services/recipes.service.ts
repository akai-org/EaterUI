import db from "../db";
import {
  Recipe,
  CreateRecipeDto,
  RecipeSchema,
  RecipeSchemaInfoBatch,
  RecipeSchemaInfoBatchSchema,
  UpdateRecipeDto,
} from "../validators/recipes.validator";
import { HttpError } from "../errors/HttpError";

export async function listRecipes(
  userId: string,
  {
    query,
    limit = 10,
    offset = 0,
  }: { query?: string; limit?: number; offset?: number } = {}
): Promise<RecipeSchemaInfoBatch> {
  const recipes = await db.recipe.findMany({
    where: { userId, name: { contains: query } },
    skip: offset,
    take: Math.min(limit, 50),
    orderBy: { createdAt: "desc" },
  });

  return RecipeSchemaInfoBatchSchema.parse(recipes);
}

export async function getRecipeById(
  userId: string,
  id: number
): Promise<Recipe> {
  const recipeWithIngredients = await db.recipe.findFirst({
    where: { userId, id },
    include: {
      ingredients: true,
    },
  });

  if (!recipeWithIngredients) {
    throw new HttpError(404, `Recipe with id ${id} does not exist`);
  }

  return RecipeSchema.parse(recipeWithIngredients);
}

export async function createRecipe(
  userId: string,
  data: CreateRecipeDto
): Promise<{ id: number }> {
  const { ingredients, ...recipeData } = data;

  const { id } = await db.recipe.create({
    data: {
      userId,
      ...recipeData,
      ingredients: {
        create: ingredients,
      },
    },
    select: {
      id: true,
    },
  });

  return { id };
}

export async function updateRecipeById(
  userId: string,
  id: number,
  data: UpdateRecipeDto
): Promise<void> {
  const recipe = await db.recipe.findFirst({ where: { id, userId } });
  if (!recipe) throw new HttpError(404, `Recipe with id ${id} does not exist`);

  const { ingredients, ...recipeData } = data;

  await db.$transaction([
    db.recipe.update({ data: { userId, ...recipeData }, where: { id } }),
    db.recipeIngredient.deleteMany({ where: { recipeId: id } }),
    db.recipeIngredient.createMany({
      data: ingredients.map((ingredient) => ({
        ...ingredient,
        recipeId: id,
      })),
    }),
  ]);
}

export async function deleteRecipeById(
  userId: string,
  id: number
): Promise<void> {
  const recipe = await db.recipe.findFirst({ where: { id, userId } });
  if (!recipe) throw new HttpError(404, `Recipe with id ${id} does not exist`);

  await db.recipe.delete({ where: { id } });
}
