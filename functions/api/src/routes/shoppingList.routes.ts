import express from "express";
import * as ShoppingListController from "../controllers/shoppingList.controller";

const router = express.Router();

router.get("/", ShoppingListController.listShoppingListOverview);
router.get("/:id", ShoppingListController.getShoppingList);
router.post("/", ShoppingListController.createShoppingList);
router.put("/:id/item/:itemId", ShoppingListController.markShoppingListItem);

export default router;
