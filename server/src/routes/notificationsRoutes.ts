import dayjs from "dayjs";
import { Express } from "express";
import { model } from "mongoose";
import requireJwt from "../middlewares/requireJwt";
import { NotificationsType } from "../models/Notifications";
import { assertRequestWithUser } from "../types";

const Notifications = model<NotificationsType>("notifications");

const notificationsRoutes = (app: Express) => {
  app.get("/api/notifications", requireJwt, async (req, res) => {
    assertRequestWithUser(req);

    try {
      const notifications = await Notifications.findOne<NotificationsType>({
        _user: req.user._user,
      }).exec();

      const awardNotifications = notifications?.awardNotifications || [];

      const userTaskLikes =
        notifications?.userTaskLikes?.filter(
          ({ total }) => total && total > 0
        ) || [];

      const userTaskComments =
        notifications?.userTaskComments?.filter(
          ({ total }) => total && total > 0
        ) || [];

      const commentLikes =
        notifications?.commentLikes?.filter(
          ({ total }) => total && total > 0
        ) || [];

      res.send([
        awardNotifications,
        userTaskLikes,
        userTaskComments,
        commentLikes,
      ]);
    } catch (err) {
      console.log(err);
      res.status(500).send("Unable to retrieve notifications right now");
    }
  });
};

export default notificationsRoutes;
