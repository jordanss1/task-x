"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requireJwt_1 = __importDefault(require("../middlewares/requireJwt"));
const types_1 = require("../types");
const Notifications = (0, mongoose_1.model)("notifications");
const PublicTaskList = (0, mongoose_1.model)("publicTaskList");
const notificationsRoutes = (app) => {
    app.get("/api/notifications", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        try {
            const notifications = await Notifications.findOne({
                _user: req.user._user,
            }).exec();
            const awardNotifications = notifications?.awardNotifications || [];
            const userTaskLikes = notifications?.userTaskLikes?.filter(({ total }) => total && total > 0) || [];
            const userTaskComments = notifications?.userTaskComments?.filter(({ total }) => total && total > 0) || [];
            const commentLikes = notifications?.commentLikes?.filter(({ total }) => total && total > 0) || [];
            res.send([
                awardNotifications,
                userTaskLikes,
                userTaskComments,
                commentLikes,
            ]);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Unable to retrieve notifications right now");
        }
    });
    app.patch("/api/notifications", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        try {
            await Notifications.findOneAndUpdate({
                _user: req.user._user,
            }, {
                $set: {
                    "awardNotifications.$[noti].unseen": false,
                    "userTaskLikes.$[noti].unseen": false,
                    "userTaskComments.$[noti].unseen": false,
                    "commentLikes.$[noti].unseen": false,
                },
            }, { arrayFilters: [{ "noti.taskId": req.body.taskId }] }).exec();
            res.send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Unable to retrieve task, try again");
        }
    });
};
exports.default = notificationsRoutes;
