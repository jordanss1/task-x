import { Express } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import keys from "../config/keys";
import requireJwt from "../middlewares/requireJwt";
import { assertRequestWithUser } from "../types";

const { clientUrl, jwtSecret } = keys;

const googleAuthRoutes = (app: Express) => {
  app.get(
    `/auth/google`,
    passport.authenticate("google", {
      scope: ["profile", "email"],
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
      assertRequestWithUser(req);

      const { user } = req;

      const token = jwt.sign({ user }, jwtSecret, {
        expiresIn: "2h",
      });

      res.cookie("token", token, { httpOnly: true });

      req.user = user;

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

  app.get("/api/current_user", requireJwt, (req, res) => {
    res.send(req.user);
  });
};

export default googleAuthRoutes;
