import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import configurePassport from "./config/passport";
import router from "./router";

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

export default app;
