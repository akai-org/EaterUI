import express from "express";
import * as ShoppingListController from "../controllers/shoppingList.controller";
import validateSchema from "../middleware/validateSchema";
import {
  ShoppingListQuerySchema,
  ShoppingListIdParamSchema,
  CreateShoppingListSchema,
  UpdateShoppingListItemSchema,
} from "../schema/shoppingList.schema";

/**
 * @swagger
 * tags:
 *   name: ShoppingList
 *   description: The shopping list managing API
 */

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingListSummary:
 *       type: object
 *       required:
 *         - id
 *         - startDate
 *         - endDate
 *         - ingredients
 *         - markedIngredients
 *       properties:
 *         id:
 *           type: integer
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         ingredients:
 *           type: integer
 *         markedIngredients:
 *           type: integer
 */

/**
 * @swagger
 * /shopping-list:
 *   get:
 *     summary: Returns the list of shopping list summaries
 *     tags: [ShoppingList]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Used for pagination, describing number of returned shopping lists
 *       - in: query
 *         name: offset
 *         schema:
 *           type: number
 *         description: Used for pagination, describing offset of the cursor
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the shopping list summaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingListSummary'
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/",
  validateSchema(ShoppingListQuerySchema),
  ShoppingListController.listShoppingListOverview,
);

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingListIngredientAmount:
 *       type: object
 *       required:
 *         - amount
 *         - measure
 *       properties:
 *         amount:
 *           type: number
 *         measure:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingListIngredient:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - marked
 *         - amounts
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         marked:
 *           type: boolean
 *         items:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/ShoppingListIngredientAmount'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingList:
 *       type: object
 *       required:
 *         - id
 *         - startDate
 *         - endDate
 *         - ingredients
 *       properties:
 *         id:
 *           type: integer
 *         startDate:
 *           type: string
 *           foramt: date
 *         endDate:
 *           type: string
 *           format: date
 *         ingredients:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/ShoppingListIngredient'
 */

/**
 * @swagger
 * /shopping-list/{id}:
 *   get:
 *     summary: Get the shopping list details by id
 *     tags: [ShoppingList]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The shopping list id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The shopping list details with list of ingredients and their amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ShoppingList'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The shopping list was not found
 */

router.get(
  "/:id",
  validateSchema(ShoppingListIdParamSchema),
  ShoppingListController.getShoppingList,
);

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingListInput:
 *       type: object
 *       required:
 *         - startDate
 *         - endDate
 *       properties:
 *         startDate:
 *           type: string
 *           foramt: date
 *         endDate:
 *           type: string
 *           foramt: date
 */

/**
 * @swagger
 * /shopping-list:
 *  post:
 *    summary: Create a new shopping list
 *    tags: [ShoppingList]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/ShoppingListInput'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      201:
 *        description: The shopping list was created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/ShoppingList'
 *      401:
 *        description: Unauthorized
 *      400:
 *        description: The shopping list input was invalid
 *      500:
 *        description: Internal server error
 */

router.post(
  "/",
  validateSchema(CreateShoppingListSchema),
  ShoppingListController.createShoppingList,
);

/**
 * @swagger
 * /shopping-list/{id}/item/{item-id}:
 *  put:
 *    summary: Mark the shopping list item
 *    tags: [ShoppingList]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The shopping list id
 *      - in: path
 *        name: item-id
 *        schema:
 *          type: number
 *        required: true
 *        description: The shopping list item id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              marked:
 *                type: boolean
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      204:
 *        description: The shopping list item was updated
 *      400:
 *        description: The input was invalid
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: The shopping list or shopping list item was not found
 *      500:
 *        description: Internal server error
 */

router.put(
  "/:id/item/:itemId",
  validateSchema(UpdateShoppingListItemSchema),
  ShoppingListController.markShoppingListItem,
);

export default router;
