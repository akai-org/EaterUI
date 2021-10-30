import express from "express";
import * as RecipeController from "../controllers/recipes.controller";

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
 *         - graphicURL
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         graphicURL:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: The recipes managing API
 */

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Returns the list of all the recipes for a user
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
 */

router.get("/", RecipeController.listRecipes);

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
 *         - graphicURL
 *         - ingredients
 *       properties:
 *         id:
 *           type: number
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
 *       404:
 *         description: The recipe was not found
 */

router.get("/:id", RecipeController.getRecipe);

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRecipeInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - graphicURL
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
 *    summary: Create new recipe
 *    tags: [Recipes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateRecipeInput'
 *    security:
 *      - googleAuth: []
 *      - googleAuthSig: []
 *    responses:
 *      200:
 *        description: The recipe was created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *      404:
 *        description: The recipe input was invalid
 *      500:
 *        description: Internal server error
 */

router.post("/", RecipeController.createRecipe);

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
 *    responses:
 *      204:
 *        description: The recipe was updated
 *      400:
 *        description: The recipe input was invalid
 *      404:
 *        description: The recipe was not found
 *      500:
 *        description: Internal server error
 */

router.put("/:id", RecipeController.updateRecipe);

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
 *      404:
 *        description: The recipe was not found
 *      500:
 *        description: Internal server error
 */

router.delete("/:id", RecipeController.deleteRecipe);

export default router;
