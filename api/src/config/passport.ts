import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "../db";

export default function configurePassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
      },
      async function (_accessToken, _refreshToken, profile, done) {
        const { id, displayName } = profile;
        const userData = { id, displayName };

        const user = await db.user.findFirst({ where: { id } });

        if (!user) {
          await db.user.create({ data: userData });
        }

        done(null, userData);
      },
    ),
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user as Express.User);
  });
}
