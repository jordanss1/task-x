"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsSchema = exports.likeNotificationSchema = exports.commentNotificationSchema = void 0;
const mongoose_1 = require("mongoose");
const awardNotificationSchema = new mongoose_1.Schema({
    taskId: { type: String, required: true },
    task: { type: String, required: true },
    type: { type: String, required: false, default: "award" },
    award: { type: String, required: true },
    unseen: { type: Boolean, required: false, default: false },
    created: { type: String, required: true },
});
exports.commentNotificationSchema = new mongoose_1.Schema({
    taskId: { type: String, required: true },
    commentId: { type: String, required: false, default: null },
    type: { type: String, required: true },
    task: { type: String, required: true },
    users: { type: [String], required: false, default: [] },
    total: { type: Number, required: false, default: 0 },
    unseen: { type: Boolean, required: false, default: false },
    created: { type: String, required: false, default: null },
});
exports.likeNotificationSchema = new mongoose_1.Schema({
    taskId: { type: String, required: true },
    task: { type: String, required: true },
    type: { type: String, required: false, default: "taskLike" },
    users: { type: [String], required: false, default: [] },
    total: { type: Number, required: false, default: 0 },
    unseen: { type: Boolean, required: false, default: false },
    created: { type: String, required: false, default: null },
});
exports.notificationsSchema = new mongoose_1.Schema({
    _user: { type: String, required: true },
    awardNotifications: {
        type: [awardNotificationSchema],
        required: false,
        default: [],
    },
    userTaskLikes: {
        type: [exports.likeNotificationSchema],
        required: false,
        default: [],
    },
    userTaskComments: {
        type: [exports.commentNotificationSchema],
        required: false,
        default: [],
    },
    commentLikes: {
        type: [exports.commentNotificationSchema],
        required: false,
        default: [],
    },
});
(0, mongoose_1.model)("likeNotification", exports.likeNotificationSchema);
(0, mongoose_1.model)("commentNotification", exports.commentNotificationSchema);
(0, mongoose_1.model)("awardNotification", awardNotificationSchema);
(0, mongoose_1.model)("notifications", exports.notificationsSchema);
