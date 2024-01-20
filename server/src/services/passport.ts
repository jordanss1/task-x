import { model } from "mongoose";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import keys from "../config/keys";
import { UserType } from "../models/User";

const { googleClientId, googleSecret } = keys;

const GoogleStrategy = Strategy;

const User = model<UserType>("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleSecret,
      callbackURL: "/api/auth/google/callback",
      proxy: true,
    },
    async (token, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ _user: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await new User<UserType>({
        _user: profile.id,
      }).save();

      return done(null, newUser);
    }
  )
);
