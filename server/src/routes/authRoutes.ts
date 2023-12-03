import { Express } from "express";
import passport from "passport";
import keys from "../config/keys";

const googleAuthRoutes = (app: Express) => {
  app.get(
    `/auth/google`,
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback", (req, res) => {
    res.redirect(`${keys.clientUrl}/dashboard`);
  });
};

export default googleAuthRoutes;
