"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsSchema = exports.interactionSchema = exports.commentInteractionSchema = void 0;
const mongoose_1 = require("mongoose");
const awardInteractionSchema = new mongoose_1.Schema({
    taskId: { type: String, required: true },
    task: { type: String, required: true },
    award: { type: String, required: true },
    unseen: { type: Boolean, required: false, default: false },
    created: { type: String, required: true },
});
exports.commentInteractionSchema = new mongoose_1.Schema({
    taskId: { type: String, required: true },
    commentId: { type: String, required: true },
    task: { type: String, required: true },
    users: { type: [String], required: false, default: [] },
    total: { type: Number, required: false, default: 0 },
    unseen: { type: Boolean, required: false, default: false },
    created: { type: String, required: false, default: null },
});
exports.interactionSchema = new mongoose_1.Schema({
    taskId: { type: String, required: true },
    task: { type: String, required: true },
    users: { type: [String], required: false, default: [] },
    total: { type: Number, required: false, default: 0 },
    unseen: { type: Boolean, required: false, default: false },
    created: { type: String, required: false, default: null },
});
exports.notificationsSchema = new mongoose_1.Schema({
    _user: { type: String, required: true },
    awardNotifications: {
        type: [awardInteractionSchema],
        required: false,
        default: [],
    },
    userTaskLikes: {
        type: [exports.interactionSchema],
        required: false,
        default: [],
    },
    userTaskComments: {
        type: [exports.interactionSchema],
        required: false,
        default: [],
    },
    commentLikes: {
        type: [exports.commentInteractionSchema],
        required: false,
        default: [],
    },
});
(0, mongoose_1.model)("interaction", exports.interactionSchema);
(0, mongoose_1.model)("commentNotification", exports.commentInteractionSchema);
(0, mongoose_1.model)("awardNotification", awardInteractionSchema);
(0, mongoose_1.model)("notifications", exports.notificationsSchema);
