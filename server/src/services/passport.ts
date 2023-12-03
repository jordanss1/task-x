import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import keys from "../config/keys";

const GoogleStrategy = Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleSecret,
      callbackURL: `${keys.serverUrl}/auth/google/callback`,
    },
    (token) => console.log(token)
  )
);
