import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cookieParse from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import configurePassport from "./config/passport";
import router from "./router";
import errorMiddleware from "./middleware/error";
import { authMiddleware } from "./middleware/auth";
import { specs } from "./config/swagger";
import { whitelistedOrigins } from "./config/cors";

dotenv.config();

const app = express();

configurePassport();

app.set("trust proxy", 1);
app.use(cors({ origin: whitelistedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParse());

const authenticate = passport.authenticate("google-token");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/", authMiddleware, authenticate, router);
app.use(errorMiddleware);

export default app;
