import express from "express";
import * as RecipeController from "../controllers/recipes.controller";

const router = express.Router();

router.get("/", RecipeController.listRecipes);
router.get("/:id", RecipeController.getRecipe);
router.post("/", RecipeController.createRecipe);
router.put("/:id", RecipeController.updateRecipe);
router.delete("/:id", RecipeController.deleteRecipe);

export default router;
