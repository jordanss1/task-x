import { Express } from "express";
import jwt from "jsonwebtoken";
import { model } from "mongoose";
import passport from "passport";
import keys from "../config/keys";
import { UserType } from "../models/User";
import { assertRequestWithUser } from "../types";

const { clientUrl, jwtSecret } = keys;

const User = model<UserType>("users");

const googleAuthRoutes = (app: Express) => {
  app.get(
    `/auth/google`,
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      session: false,
      failureRedirect: clientUrl,
      failureMessage: "Login error, try again",
    }),
    (req, res) => {
      const { user } = req;

      const token = jwt.sign({ ...user }, jwtSecret, {
        expiresIn: "1h",
      });

      res.cookie("token", token);

      if (user?.userDetails) {
        res.redirect(`${clientUrl}/dashboard`);
      }

      res.redirect(`${clientUrl}/setup`);
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout({}, () => {});
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
};

export default googleAuthRoutes;
