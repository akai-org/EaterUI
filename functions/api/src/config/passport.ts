import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export default function configurePassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
      },
      function (_accessToken, _refreshToken, profile, cb) {
        const { id, displayName } = profile;
        return cb(null, { id, displayName });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user as Express.User);
  });
}
