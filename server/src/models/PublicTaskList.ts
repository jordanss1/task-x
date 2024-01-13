import { InferSchemaType, Schema, Types, model } from "mongoose";
import { commentSchema } from "./Comment";
import { userSchema } from "./User";

export const publicTaskSchema = new Schema({
  task: { required: true, type: String },
  taskId: { required: true, type: String },
  user: { type: userSchema, required: true },
  enabledDueDate: { required: true, type: Boolean },
  dueDate: { required: false, type: String, default: null },
  created: { required: true, type: String },
  complete: { required: false, type: Boolean, default: false },
  awards: {
    required: false,
    type: Array,
    default: [],
  },
  likes: { required: false, type: Number, default: 0 },
  comments: { type: [commentSchema], required: false, default: [] },
});

export const publicTaskListSchema = new Schema({
  _user: { required: true, type: Schema.Types.ObjectId, ref: "User" },
  tasks: { required: true, type: [publicTaskSchema], default: null },
  totalTasks: { required: true, type: Number, default: 0 },
});

export type PublicTaskType = InferSchemaType<typeof publicTaskSchema>;

export type PublicTaskListType = InferSchemaType<typeof publicTaskListSchema>;

model<PublicTaskListType>("publicTaskList", publicTaskListSchema);
model<PublicTaskType>("publicTask", publicTaskSchema);
