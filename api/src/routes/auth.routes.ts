import * as AuthController from "../controllers/auth.controller";
import express from "express";

const router = express.Router();

router.get("/", AuthController.getUserInfo);
router.get("/google", AuthController.googleSignIn);
router.get("/google/callback", AuthController.googleCallback);
router.get("/logout", AuthController.logout);

export default router;
