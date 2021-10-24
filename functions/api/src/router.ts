import express, { IRouter } from "express";
import { authMiddleware } from "./middleware/auth";
import AuthRouter from "./routes/auth.routes";
import RecipeRouter from "./routes/recipes.routes";
import MenuRouter from "./routes/menu.routes";
import ShoppingListRouter from "./routes/shoppingList.routes";

const router: IRouter = express.Router();

router.use("/auth", AuthRouter);
router.use("/recipes", authMiddleware, RecipeRouter);
router.use("/menu", authMiddleware, MenuRouter);
router.use("/shopping-list", authMiddleware, ShoppingListRouter);

export default router;
