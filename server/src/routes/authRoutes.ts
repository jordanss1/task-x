import dayjs from "dayjs";
import { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HydratedDocument, model } from "mongoose";
import passport from "passport";
import keys from "../config/keys";
import createTokenAndCookie from "../functions/createTokenAndCookie";
import requireJwt from "../middlewares/requireJwt";
import { UserType, ValidUserType } from "../models/User";
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

      const response = createTokenAndCookie(user, res);

      if (user?.profile) {
        response.redirect("/dashboard");
      }

      response.redirect("/setup");
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
    async (req: Request, res: Response) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.user?._id },
          {
            profile: req.body,
          },
          { new: true }
        );

        const response = createTokenAndCookie(
          updatedUser as HydratedDocument<ValidUserType>,
          res
        );

        req.user = updatedUser as HydratedDocument<ValidUserType>;
        response.send(updatedUser);
      } catch (err) {
        res.status(500).send("Server error please try again");
      }
    }
  );
};

export default googleAuthRoutes;
