import { InferSchemaType, Schema, model } from "mongoose";

const awardInteractionSchema = new Schema({
  taskId: { type: String, required: true },
  task: { type: String, required: true },
  award: { type: String, required: true },
  unseen: { type: Boolean, required: false, default: false },
  created: { type: String, required: true },
});

export const commentInteractionSchema = new Schema({
  taskId: { type: String, required: true },
  commentId: { type: String, required: true },
  task: { type: String, required: true },
  users: { type: [String], required: false, default: [] },
  total: { type: Number, required: false, default: 0 },
  unseen: { type: Boolean, required: false, default: false },
  created: { type: String, required: false, default: null },
});

export const interactionSchema = new Schema({
  taskId: { type: String, required: true },
  task: { type: String, required: true },
  users: { type: [String], required: false, default: [] },
  total: { type: Number, required: false, default: 0 },
  unseen: { type: Boolean, required: false, default: false },
  created: { type: String, required: false, default: null },
});

export const notificationsSchema = new Schema({
  _user: { type: String, required: true },
  awardNotifications: {
    type: [awardInteractionSchema],
    required: false,
    default: [],
  },
  userTaskLikes: {
    type: [interactionSchema],
    required: false,
    default: [],
  },
  userTaskComments: {
    type: [interactionSchema],
    required: false,
    default: [],
  },
  commentLikes: {
    type: [commentInteractionSchema],
    required: false,
    default: [],
  },
});

export type NotificationsType = InferSchemaType<typeof notificationsSchema>;

export type AwardInteractionType = InferSchemaType<
  typeof awardInteractionSchema
>;

export type CommentInteractionType = InferSchemaType<
  typeof commentInteractionSchema
>;

export type InteractionType = InferSchemaType<typeof interactionSchema>;

model<InteractionType>("interaction", interactionSchema);
model<CommentInteractionType>("commentNotification", commentInteractionSchema);
model<AwardInteractionType>("awardNotification", awardInteractionSchema);
model<NotificationsType>("notifications", notificationsSchema);
