import { InferSchemaType, Schema } from "mongoose";
import { commentSchema } from "./Comment";
import { userSchema } from "./User";

export const publicTaskSchema = new Schema({
  task: { required: true, type: String },
  taskId: { required: true, type: String, default: null },
  user: { type: userSchema, required: true },
  enabledDueDate: { required: true, type: Boolean },
  dueDate: { required: false, type: String },
  created: { required: true, type: String },
  awards: {
    required: true,
    type: Array,
  },
  likes: { required: true, type: Number, default: null },
  comments: { type: [commentSchema], required: false, default: null },
});

export type PublicTaskType = InferSchemaType<typeof publicTaskSchema>;
