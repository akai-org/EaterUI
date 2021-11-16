import express, { IRouter } from "express";
import AuthRouter from "./routes/auth.routes";
import RecipeRouter from "./routes/recipes.routes";
import MenuRouter from "./routes/menu.routes";
import ShoppingListRouter from "./routes/shoppingList.routes";

const router: IRouter = express.Router();

router.use("/auth", AuthRouter);
router.use("/recipes", RecipeRouter);
router.use("/menu", MenuRouter);
router.use("/shopping-list", ShoppingListRouter);

export default router;
