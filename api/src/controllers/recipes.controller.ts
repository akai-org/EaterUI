import { Request, Response, NextFunction } from "express";
import * as RecipeService from "../services/recipes.service";
import {
  RecipesQuery,
  RecipeSchemaInfoBatch,
  RecipeId,
  Recipe,
  CreateRecipeBody,
  UpdateRecipeBody,
} from "./../schema/recipes.schema";

export async function listRecipes(
  req: Request<{}, {}, {}, RecipesQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    const recipes: RecipeSchemaInfoBatch = await RecipeService.listRecipes(
      req.user?.id!,
      req.query
    );

    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
}

export async function getRecipe(
  req: Request<RecipeId>,
  res: Response,
  next: NextFunction
) {
  try {
    const recipe: Recipe = await RecipeService.getRecipeById(
      req.user?.id!,
      req.params.id
    );

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
}

export async function createRecipe(
  req: Request<{}, {}, CreateRecipeBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const recipe: RecipeId = await RecipeService.createRecipe(
      req.user?.id!,
      req.body
    );

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
}

export async function updateRecipe(
  req: Request<RecipeId, {}, UpdateRecipeBody>,
  res: Response,
  next: NextFunction
) {
  try {
    await RecipeService.updateRecipeById(
      req.user?.id!,
      req.params.id,
      req.body
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function deleteRecipe(
  req: Request<RecipeId>,
  res: Response,
  next: NextFunction
) {
  try {
    await RecipeService.deleteRecipeById(req.user?.id!, req.params.id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
