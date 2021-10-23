import express, { IRouter } from "express";
import authRouter from "./routes/auth.routes";

const router: IRouter = express.Router();

router.use("/auth", authRouter);

export default router;
