import * as AuthController from "../controllers/auth.controller";
import express from "express";

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    googleAuth:
 *      type: apiKey
 *      in: cookie
 *      name: google-auth-session
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    googleAuthSig:
 *      type: apiKey
 *      in: cookie
 *      name: google-auth-session.sig
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
 *       - googleAuth: []
 *       - googleAuthSig: []
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

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Redirects to the Google's OAuth2.0 auth handler
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to the Google's OAuth2.0 auth handler
 */

router.get(
  "/google",
  AuthController.storeUIRedirectUrl,
  AuthController.googleSignIn,
);

router.get(
  "/google/callback",
  AuthController.googleCallback,
  AuthController.redirectToUIUrl,
);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logging out user and clearing out session
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to the / after successful logout
 */

router.get("/logout", AuthController.storeUIRedirectUrl, AuthController.logout);

router.get("/", AuthController.redirectToUIUrl);

export default router;
