import dayjs from "dayjs";
import { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { model } from "mongoose";
import passport from "passport";
import keys from "../config/keys";
import requireJwt from "../middlewares/requireJwt";
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
      assertRequestWithUser(req);

      const { user } = req;

      const token = jwt.sign({ user }, jwtSecret, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: dayjs().add(1, "day").toDate(),
      });

      if (user?.userDetails) {
        res.redirect(`${clientUrl}/dashboard`);
      }

      res.redirect(`${clientUrl}/setup`);
    }
  );

  app.get("/api/logout", requireJwt, (req, res) => {
    req.user = undefined;
    res.clearCookie("token");
    res.redirect(clientUrl);
  });

  app.get("/api/current_user", requireJwt, (req, res) => {
    res.send(req.user);
  });

  app.post(
    "/api/username_check",
    requireJwt,
    async (req: Request, res: Response) => {
      const match = await User.findOne<UserType>({
        "userDetails.userName": req.body.username,
      })
        .select("userDetails.userName")
        .exec();

      res.send(match ? true : false);
    }
  );
};

export default googleAuthRoutes;
