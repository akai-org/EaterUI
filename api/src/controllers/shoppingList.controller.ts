import { Request, Response, NextFunction } from "express";
import * as ShoppingListService from "../services/shoppingList.service";
import {
  ShoppingListQuery,
  ShoppingListSummary,
  ShoppingListId,
  ShoppingListDetails,
  CreateShoppingListBody,
  UpdateShoppingListItemParams,
  UpdateShoppingListItemBody,
} from "../schema/shoppingList.schema";

export async function listShoppingListOverview(
  req: Request<{}, {}, {}, ShoppingListQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    const shoppingListOverviews: ShoppingListSummary = await ShoppingListService.shoppingListSummary(
      req.user?.id!,
      req.query
    );

    res.status(200).json(shoppingListOverviews);
  } catch (error) {
    next(error);
  }
}

export async function getShoppingList(
  req: Request<ShoppingListId>,
  res: Response,
  next: NextFunction
) {
  try {
    const shoppingList: ShoppingListDetails = await ShoppingListService.shoppingListDetails(
      req.user?.id!,
      req.params.id
    );

    res.status(200).json(shoppingList);
  } catch (error) {
    next(error);
  }
}

export async function createShoppingList(
  req: Request<{}, {}, CreateShoppingListBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const shoppingList = await ShoppingListService.generateShoppingList(
      req.user?.id!,
      req.body
    );

    res.status(201).json(shoppingList);
  } catch (error) {
    next(error);
  }
}

export async function markShoppingListItem(
  req: Request<UpdateShoppingListItemParams, {}, UpdateShoppingListItemBody>,
  res: Response,
  next: NextFunction
) {
  try {
    await ShoppingListService.markShoppingListItem(
      req.user?.id!,
      req.params.id,
      req.params.itemId,
      req.body.marked
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
