import {  model } from "mongoose";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import keys from "../config/keys";
import { UserType } from "../models/User";

const { googleClientId, googleSecret, serverUrl, jwtSecret } = keys;

const GoogleStrategy = Strategy;

const User = model<UserType>("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleSecret,
      callbackURL: `${serverUrl}/auth/google/callback`,
    },
    async (token, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await new User<UserType>({
        googleId: profile.id,
      }).save();

      return done(null, newUser);
    }
  )
);
