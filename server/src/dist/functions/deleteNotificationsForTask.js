"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Notifications = (0, mongoose_1.model)("notifications");
const deleteNotificationsForTask = async (_user, taskId) => {
    await Notifications.findOneAndUpdate({
        _user,
    }, {
        $pull: {
            userTaskLikes: { taskId },
            userTaskComments: { taskId },
            awardNotifications: { taskId },
        },
    }).exec();
    await Notifications.updateMany({}, {
        $pull: {
            commentLikes: { taskId },
        },
    }).exec();
};
exports.default = deleteNotificationsForTask;
