import passport from "passport";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";
import { findByIdUserService } from "../services/user.service";
import { config } from "./app.config";

interface JwtPayload {
  userId: string;
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
  audience: ["user"],
  algorithms: ["HS256"],
};

passport.use(
  new JwtStrategy(options, async (payload: JwtPayload, done) => {
    try {
      const user = await findByIdUserService(payload.userId);

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }),
);

passport.serializeUser((user: any, done) => done(null, user));

passport.deserializeUser((user: any, done) => done(null, user));

export const passportAuthenticate = passport.authenticate("jwt", {
  session: false,
});
