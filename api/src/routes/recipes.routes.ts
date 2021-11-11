import express from "express";
import * as RecipeController from "../controllers/recipes.controller";
import validateSchema from "../middleware/validateSchema";
import {
  RecipeIdParamSchema,
  RecipesQuerySchema,
  CreateRecipeSchema,
  UpdateRecipeSchema,
} from "../schema/recipes.schema";

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: The recipes managing API
 */

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         graphicURL:
 *           type: string
 */

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Returns the list of all the recipes
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The search string including name of the recipe
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Used for pagination, describing number of returned recipes
 *       - in: query
 *         name: offset
 *         schema:
 *           type: number
 *         description: Used for pagination, describing offset of the cursor
 *     security:
 *       - googleAuth: []
 *       - googleAuthSig: []
 *     responses:
 *       200:
 *         description: The list of the recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/",
  validateSchema(RecipesQuerySchema),
  RecipeController.listRecipes,
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *         - amount
 *         - measure
 *       properties:
 *         name:
 *           type: string
 *         amount:
 *           type: number
 *         measure:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeDetails:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - ingredients
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         graphicURL:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Ingredient'
 */

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get the recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recipe id
 *     security:
 *       - googleAuth: []
 *       - googleAuthSig: []
 *     responses:
 *       200:
 *         description: The recipe details with list of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeDetails'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The recipe was not found
 */

router.get(
  "/:id",
  validateSchema(RecipeIdParamSchema),
  RecipeController.getRecipe,
);

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - ingredients
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         graphicURL:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Ingredient'
 */

/**
 * @swagger
 * /recipes:
 *  post:
 *    summary: Create a new recipe
 *    tags: [Recipes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RecipeInput'
 *    security:
 *      - googleAuth: []
 *      - googleAuthSig: []
 *    responses:
 *      201:
 *        description: The recipe was created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *      401:
 *        description: Unauthorized
 *      400:
 *        description: The recipe input was invalid
 *      500:
 *        description: Internal server error
 */

router.post(
  "/",
  validateSchema(CreateRecipeSchema),
  RecipeController.createRecipe,
);

/**
 * @swagger
 * /recipes/{id}:
 *  put:
 *    summary: Update the recipe by the id
 *    tags: [Recipes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The recipe id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RecipeDetails'
 *    security:
 *      - googleAuth: []
 *      - googleAuthSig: []
 *    responses:
 *      204:
 *        description: The recipe was updated
 *      400:
 *        description: The recipe input was invalid
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: The recipe was not found
 *      500:
 *        description: Internal server error
 */

router.put(
  "/:id",
  validateSchema(UpdateRecipeSchema),
  RecipeController.updateRecipe,
);

/**
 * @swagger
 * /recipes/{id}:
 *  delete:
 *    summary: Delete the recipe by the id
 *    tags: [Recipes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The recipe id
 *    security:
 *      - googleAuth: []
 *      - googleAuthSig: []
 *    responses:
 *      204:
 *        description: The recipe was deleted
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: The recipe was not found
 *      500:
 *        description: Internal server error
 */

router.delete(
  "/:id",
  validateSchema(RecipeIdParamSchema),
  RecipeController.deleteRecipe,
);

export default router;
