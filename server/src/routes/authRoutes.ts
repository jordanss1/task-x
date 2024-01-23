import { Express, Request, Response } from "express";
import { HydratedDocument, model } from "mongoose";
import passport from "passport";
import createTokenAndCookie from "../functions/createTokenAndCookie";
import requireJwt from "../middlewares/requireJwt";
import { PublicTaskListType } from "../models/PublicTaskList";
import { TaskListType } from "../models/TaskList";
import { UserType, ValidUserType } from "../models/User";
import { assertRequestWithUser } from "../types";

const User = model<UserType>("users");
const TaskList = model<TaskListType>("taskList");
const PublicTaskList = model<PublicTaskListType>("publicTaskList");

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
        response.redirect("/dashboard/home");
        return;
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
        "profile.nameLowerCase": req.body.username.toLowerCase(),
      })
        .select("profile.userName")
        .exec();

      res.send(match ? true : false);
    }
  );

  app.post(
    "/api/profile",
    requireJwt,
    async (
      req: Request<any, {}, Omit<ValidUserType["profile"], "nameLowerCase">>,
      res: Response
    ) => {
      const { userName, profilePicture } = req.body;

      try {
        const updatedUser = await User.findOneAndUpdate<UserType>(
          { _id: req.user?._id },
          {
            profile: {
              _user: req.user?._user,
              userName,
              profilePicture,
              nameLowerCase: userName.toLowerCase(),
            },
          },
          { new: true }
        ).exec();

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

  app.patch(
    "/api/profile",
    requireJwt,
    async (
      req: Request<any, {}, Omit<ValidUserType["profile"], "nameLowerCase">>,
      res
    ) => {
      assertRequestWithUser<Omit<ValidUserType["profile"], "nameLowerCase">>(
        req
      );

      const { userName, profilePicture } = req.body;

      try {
        const user = await User.findOneAndUpdate<ValidUserType>(
          { _id: req.user?._id },
          {
            profile: {
              _user: req.user._user,
              userName,
              profilePicture,
              nameLowerCase: userName.toLowerCase(),
            },
          },
          { new: true }
        ).exec();

        const response = createTokenAndCookie(
          user as HydratedDocument<ValidUserType>,
          res
        );

        response.send(user as HydratedDocument<ValidUserType>);
      } catch (err) {
        res.status(500).send("Problem updating profile, try again");
      }
    }
  );

  app.delete("/api/profile", requireJwt, async (req, res) => {
    try {
      await TaskList.findOneAndDelete<TaskListType>({ _user: req.user?._user });
    } catch (err) {
      res.status(500).send("Problem deleting your tasks, try again");
      return;
    }

    try {
      await PublicTaskList.findOneAndDelete({ _user: req.user?._user }).exec();
    } catch (err) {
      res.status(500).send("Problem deleting your tasks, try again");
      return;
    }

    try {
      await PublicTaskList.updateMany(
        {},
        {
          $pull: {
            "tasks.$[].comments": {
              "user._user": req.user?._user,
            },
            "tasks.$[].likes.users": {
              _user: req.user?._user,
            },
          },
          $inc: {
            "tasks.$[like].likes.likes": -1,
          },
        },
        { arrayFilters: [{ "like.likes.users._user": req.user?._user }] }
      );

      await PublicTaskList.updateMany(
        {},
        {
          $inc: {
            "tasks.$[].comments.$[like].likes.likes": -1,
          },
          $pull: {
            "tasks.$[].comments.$[].likes.users": {
              _user: req.user?._user,
            },
          },
        },
        { arrayFilters: [{ "like.likes.users._user": req.user?._user }] }
      ).exec();
    } catch (err) {
      res.status(500).send("Problem deleting your content, try again");
      return;
    }

    try {
      await User.findOneAndDelete({
        _user: req.user?._user,
      }).exec();

      req.user = undefined;
      res.clearCookie("token");
    } catch (err) {
      res.status(500).send("Problem deleting your account, try again");
    }

    res.status(200).send();
  });
};

export default googleAuthRoutes;
