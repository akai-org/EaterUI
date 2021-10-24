import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import * as ShoppingListService from "../services/shoppingList.service";
import {
  CreateShoppingListSchema,
  ShoppingListFilterSchema,
} from "./../validators/shoppingList.validator";

export async function listShoppingListOverview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { limit, offset } = ShoppingListFilterSchema.parse(req.query);

    const shoppingListOverviews =
      await ShoppingListService.shoppingListOverview(req.user?.id!, {
        limit,
        offset,
      });

    res.status(200).json(shoppingListOverviews);
  } catch (error) {
    next(error);
  }
}

export async function getShoppingList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const shoppingListId = Number(req.params.id);

    const shoppingList = await ShoppingListService.getShoppingListDetails(
      req.user?.id!,
      shoppingListId
    );

    res.status(200).json(shoppingList);
  } catch (error) {
    next(error);
  }
}

export async function createShoppingList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const shoppingListData = CreateShoppingListSchema.parse(req.body);

    const shoppingList = await ShoppingListService.generateShoppingList(
      req.user?.id!,
      shoppingListData
    );

    res.status(201).json(shoppingList);
  } catch (error) {
    next(error);
  }
}

export async function markShoppingListItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const shoppingListId = Number(req.params.id);
    const shoppingListItemId = Number(req.params.itemId);
    const { marked } = z.object({ marked: z.boolean() }).parse(req.body);

    const shoppingList = await ShoppingListService.markShoppingListItem(
      req.user?.id!,
      shoppingListId,
      shoppingListItemId,
      marked
    );

    res.status(201).json(shoppingList);
  } catch (error) {
    next(error);
  }
}
