import { Request } from "express";
import { model } from "mongoose";
import { NotificationsType } from "../models/Notifications";

const Notifications = model<NotificationsType>("notifications");

const deleteNotificationsForTask = async (_user: string, taskId: string) => {
  await Notifications.findOneAndUpdate(
    {
      _user,
    },
    {
      $pull: {
        userTaskLikes: { taskId },
        userTaskComments: { taskId },
        awardNotifications: { taskId },
      },
    }
  ).exec();

  await Notifications.updateMany(
    {},
    {
      $pull: {
        commentLikes: { taskId },
      },
    }
  ).exec();
};

export default deleteNotificationsForTask;
