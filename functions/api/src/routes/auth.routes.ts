import {
  googleSignIn,
  googleCallback,
  logout,
  userInfo,
} from "./../controllers/auth.controller";
import express from "express";

const router = express.Router();

router.get("/google", googleSignIn);
router.get("/google/callback", googleCallback, userInfo);
router.get("/logout", logout);

export default router;
