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

const router = express.Router();

router.get("/", AuthController.getUserInfo);
router.get("/google", AuthController.googleSignIn);
router.get("/google/callback", AuthController.googleCallback);
router.get("/logout", AuthController.logout);

export default router;
