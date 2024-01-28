import { InferSchemaType, Schema, model } from "mongoose";

const awardNotificationSchema = new Schema({
  taskId: { type: String, required: true },
  task: { type: String, required: true },
  type: { type: String, required: false, default: "award" },
  award: { type: String, required: true },
  unseen: { type: Boolean, required: false, default: false },
  created: { type: String, required: true },
});

export const commentNotificationSchema = new Schema({
  taskId: { type: String, required: true },
  commentId: { type: String, required: false, default: null },
  type: { type: String, required: true },
  task: { type: String, required: true },
  users: { type: [String], required: false, default: [] },
  total: { type: Number, required: false, default: 0 },
  unseen: { type: Boolean, required: false, default: false },
  created: { type: String, required: false, default: null },
});

export const likeNotificationSchema = new Schema({
  taskId: { type: String, required: true },
  task: { type: String, required: true },
  type: { type: String, required: false, default: "taskLike" },
  users: { type: [String], required: false, default: [] },
  total: { type: Number, required: false, default: 0 },
  unseen: { type: Boolean, required: false, default: false },
  created: { type: String, required: false, default: null },
});

export const notificationsSchema = new Schema({
  _user: { type: String, required: true },
  awardNotifications: {
    type: [awardNotificationSchema],
    required: false,
    default: [],
  },
  userTaskLikes: {
    type: [likeNotificationSchema],
    required: false,
    default: [],
  },
  userTaskComments: {
    type: [commentNotificationSchema],
    required: false,
    default: [],
  },
  commentLikes: {
    type: [commentNotificationSchema],
    required: false,
    default: [],
  },
});

export type NotificationsType = InferSchemaType<typeof notificationsSchema>;

export type AwardNotificationType = InferSchemaType<
  typeof awardNotificationSchema
>;

export type CommentNotificationType = InferSchemaType<
  typeof commentNotificationSchema
>;

export type LikeNotificationType = InferSchemaType<
  typeof likeNotificationSchema
>;

model<LikeNotificationType>("likeNotification", likeNotificationSchema);
model<CommentNotificationType>(
  "commentNotification",
  commentNotificationSchema
);
model<AwardNotificationType>("awardNotification", awardNotificationSchema);
model<NotificationsType>("notifications", notificationsSchema);
