import db from "../db";
import { HttpError } from "../errors/HttpError";
import {
  RecipeSchemaInfoBatch,
  RecipeSchemaInfoBatchSchema,
  Recipe,
  RecipeSchema,
  CreateRecipeBody,
  RecipeId,
  UpdateRecipeBody,
} from "../schema/recipes.schema";

export async function listRecipes(
  userId: string,
  {
    query,
    limit = 10,
    offset = 0,
  }: {
    query?: string;
    limit?: number;
    offset?: number;
  },
): Promise<RecipeSchemaInfoBatch> {
  const recipes = await db.recipe.findMany({
    where: { userId, name: { contains: query } },
    skip: offset,
    take: Math.min(limit, 50),
    orderBy: { createdAt: "desc" },
  });

  console.log({ recipes });

  return RecipeSchemaInfoBatchSchema.parse(recipes);
}

export async function getRecipeById(
  userId: string,
  id: string,
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
  data: CreateRecipeBody,
): Promise<RecipeId> {
  const { ingredients, ...recipeData } = data;

  console.log({ recipeData });

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

  return { id: String(id) };
}

export async function updateRecipeById(
  userId: string,
  id: string,
  data: UpdateRecipeBody,
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
  id: string,
): Promise<void> {
  const recipe = await db.recipe.findFirst({ where: { id, userId } });
  if (!recipe) throw new HttpError(404, `Recipe with id ${id} does not exist`);

  await db.recipe.delete({ where: { id } });
}
