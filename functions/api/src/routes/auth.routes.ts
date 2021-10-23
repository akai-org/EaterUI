import * as AuthController from "./../controllers/auth.controller";
import express from "express";

const router = express.Router();

router.get("/google", AuthController.googleSignIn);
router.get(
  "/google/callback",
  AuthController.googleCallback,
  AuthController.getUserInfo
);
router.get("/logout", AuthController.logout);

export default router;
