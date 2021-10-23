import express, { IRouter } from "express";
import { authMiddleware } from "./middleware/auth";
import AuthRouter from "./routes/auth.routes";
import RecipeRouter from "./routes/recipes.routes";

const router: IRouter = express.Router();

router.use("/auth", AuthRouter);
router.use("/recipes", authMiddleware, RecipeRouter);

export default router;
