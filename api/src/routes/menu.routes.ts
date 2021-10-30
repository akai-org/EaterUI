import express from "express";
import * as MenuController from "../controllers/menu.controller";
import validateSchema from "../middleware/validateSchema";
import {
  CreateMenuItemSchema,
  MenuDetailsQuerySchema,
  MenuItemIdSchema,
  MenuSummaryQuerySchema,
  UpdateMenuItemSchema,
} from "./../schema/menu.schema";

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: The menu managing API
 */

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuSummary:
 *       type: object
 *       required:
 *         - date
 *         - count
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *         count:
 *           type: integer
 */

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Returns the summary of the menu within date range
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The beginning of the date range for querying menu
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The end of the date range for querying menu
 *     security:
 *       - googleAuth: []
 *       - googleAuthSig: []
 *     responses:
 *       200:
 *         description: The summary of the menu
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuSummary'
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/",
  validateSchema(MenuSummaryQuerySchema),
  MenuController.listMenuItems
);

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       required:
 *         - id
 *         - portions
 *         - recipe
 *       properties:
 *         id:
 *           type: string
 *         portions:
 *           type: integer
 *         recipe:
 *           $ref: '#/components/schemas/Recipe'
 */

/**
 * @swagger
 * /menu/details:
 *   get:
 *     summary: Returns the details of the menu items for a given day
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: The date for which the menu items are listed
 *     security:
 *       - googleAuth: []
 *       - googleAuthSig: []
 *     responses:
 *       200:
 *         description: The list of the menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/details",
  validateSchema(MenuDetailsQuerySchema),
  MenuController.getMenuItemsDetails
);

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItemInput:
 *       type: object
 *       required:
 *         - date
 *         - portions
 *         - recipeId
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *         portions:
 *           type: integer
 *         recipeId:
 *           type: string
 */

/**
 * @swagger
 * /menu:
 *  post:
 *    summary: Create a new menu item
 *    tags: [Menu]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MenuItemInput'
 *    security:
 *      - googleAuth: []
 *      - googleAuthSig: []
 *    responses:
 *      201:
 *        description: The menu item was created
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
 *        description: The menu item input was invalid
 *      500:
 *        description: Internal server error
 */

router.post(
  "/",
  validateSchema(CreateMenuItemSchema),
  MenuController.createMenuItem
);

/**
 * @swagger
 * /menu/{id}:
 *  put:
 *    summary: Update the menu item by the id
 *    tags: [Menu]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The menu item id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MenuItemInput'
 *    security:
 *      - googleAuth: []
 *      - googleAuthSig: []
 *    responses:
 *      204:
 *        description: The menu item was updated
 *      400:
 *        description: The menu item input was invalid
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: The manu item was not found
 *      500:
 *        description: Internal server error
 */

router.put(
  "/:id",
  validateSchema(UpdateMenuItemSchema),
  MenuController.updateMenuItem
);

/**
 * @swagger
 * /menu/{id}:
 *   delete:
 *    summary: Delete the menu item by the id
 *    tags: [Menu]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The menu item id
 *    security:
 *      - googleAuth: []
 *      - googleAuthSig: []
 *    responses:
 *      204:
 *        description: The menu item was deleted
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: The menu item was not found
 *      500:
 *        description: Internal server error
 */

router.delete(
  "/:id",
  validateSchema(MenuItemIdSchema),
  MenuController.deleteMenuItem
);

export default router;
