import * as AuthController from "../controllers/auth.controller";
import express from "express";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: string
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth managing API
 */

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInfo:
 *       type: object
 *       required:
 *         - id
 *         - displayName
 *       properties:
 *         id:
 *           type: string
 *         displayName:
 *           type: string
 */

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Returns the information about currently logged in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The information about currently logged in user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfo'
 *       401:
 *         description: Unauthorized
 */

router.get("/user", AuthController.getUserInfo);

export default router;
