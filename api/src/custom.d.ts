declare namespace Express {
  export interface Request {
    user?: { id: string; displayName: string };
  }
}

declare module "passport-google-token" {
  import { Strategy as PassportStrategy } from "passport";

  export interface StrategyOptions {
    clientID: string;
    clientSecret: string;
  }

  export interface Profile extends passport.Profile {
    id: string;
    displayName: string;
  }

  export class Strategy extends PassportStrategy {
    public constructor(
      options: StrategyOptions,
      verify: (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        cb: (err: null | Error, user?: Express.User) => void,
      ) => void,
    );
  }
}
