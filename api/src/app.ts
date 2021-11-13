import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cookieParse from "cookie-parser";
import session from "express-session";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import configurePassport from "./config/passport";
import router from "./router";
import errorMiddleware from "./middleware/error";
import { specs } from "./config/swagger";
import { whitelistedOrigins } from "./config/cors";

dotenv.config();

const app = express();

const isProduction = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);
app.use(cors({ origin: whitelistedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParse());
app.use(
  session({
    name: "google-auth-session",
    secret: process.env.SECRET_SESSION_KEY!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: isProduction ? "none" : "lax",
      httpOnly: isProduction,
      secure: isProduction,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(passport.session());

configurePassport();

app.use("/", router);
app.use(errorMiddleware);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app;
