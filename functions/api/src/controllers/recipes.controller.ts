import { Request, Response, NextFunction } from "express";
import * as RecipeService from "../services/recipes.service";
import {
  RecipeFilterSchema,
  CreateRecipeSchema,
  UpdateRecipeSchema,
} from "../validators/recipes.validator";

export async function listRecipes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { query, limit, offset } = RecipeFilterSchema.parse(req.query);

    const recipes = await RecipeService.listRecipes(req.user?.id!, {
      query,
      limit,
      offset,
    });

    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
}

export async function getRecipe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recipeId = Number(req.params.id);

    const recipe = await RecipeService.getRecipeById(req.user?.id!, recipeId);

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
}

export async function createRecipe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recipeData = CreateRecipeSchema.parse(req.body);

    const recipe = await RecipeService.createRecipe(req.user?.id!, recipeData);

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
}

export async function updateRecipe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recipeId = Number(req.params.id);
    const recipeData = UpdateRecipeSchema.parse(req.body);

    await RecipeService.updateRecipeById(req.user?.id!, recipeId, recipeData);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function deleteRecipe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recipeId = Number(req.params.id);

    await RecipeService.deleteRecipeById(req.user?.id!, recipeId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
