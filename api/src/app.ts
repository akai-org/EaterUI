import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import swaggerUI from "swagger-ui-express";
import configurePassport from "./config/passport";
import router from "./router";
import errorMiddleware from "./middleware/error";
import { specs } from "./config/swagger";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "google-auth-session",
    keys: [process.env.SECRET_SESSION_KEY!],
  })
);
app.use(passport.initialize());
app.use(passport.session());

configurePassport();

app.use("/", router);
app.use(errorMiddleware);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app;
