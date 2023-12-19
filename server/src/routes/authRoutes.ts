import dayjs from "dayjs";
import { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { model } from "mongoose";
import passport from "passport";
import keys from "../config/keys";
import requireJwt from "../middlewares/requireJwt";
import { ProfileType } from "../models/Profile";
import { UserType } from "../models/User";
import { assertRequestWithUser } from "../types";

const { jwtSecret } = keys;

const User = model<UserType>("users");

const googleAuthRoutes = (app: Express) => {
  app.get(
    `/api/auth/google`,
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  );

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/",
      failureMessage: "Login error, try again",
    }),
    (req: Request, res: Response) => {
      assertRequestWithUser(req);

      const { user } = req;

      const token = jwt.sign({ user }, jwtSecret, {
        expiresIn: "4h",
      });

      res.cookie("token", token, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        sameSite: "strict",
        expires: dayjs().add(4, "hours").toDate(),
      });

      if (user?.profile) {
        res.redirect("/dashboard");
      }

      res.redirect("/setup");
    }
  );

  app.get("/api/logout", requireJwt, (req: Request, res: Response) => {
    req.user = undefined;
    res.clearCookie("token");
    res.redirect("/");
  });

  app.get("/api/current_user", requireJwt, (req: Request, res: Response) => {
    res.send(req.user);
  });

  app.post(
    "/api/username_check",
    requireJwt,
    async (req: Request, res: Response) => {
      const match = await User.findOne<UserType>({
        "profile.userName": req.body.username,
      })
        .select("profile.userName")
        .exec();

      res.send(match ? true : false);
    }
  );

  app.post(
    "/api/profileUpdate",
    requireJwt,
    async (req: Request, res: Response<ProfileType>) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user?._id },
        {}
      );

      console.log(updatedUser);
    }
  );
};

export default googleAuthRoutes;
