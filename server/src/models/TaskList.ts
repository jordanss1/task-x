import { InferSchemaType, Schema, Types, model } from "mongoose";

export const taskSchema = new Schema({
  task: { required: true, type: String },
  taskId: { required: true, type: String, default: null },
  enabledDueDate: { required: true, type: Boolean },
  dueDate: { required: false, type: String, default: undefined },
  created: { required: true, type: String },
  onTaskWall: { required: true, type: Boolean },
});

export const taskListSchema = new Schema({
  _user: { required: true, type: Types.ObjectId, ref: "User" },
  tasks: { required: true, type: [taskSchema], default: null },
});

export type TaskType = InferSchemaType<typeof taskSchema>;

export type TaskTypeIncoming = Omit<TaskType, "taskId" | "created">;

export type TaskListType = InferSchemaType<typeof taskListSchema>;

model<TaskListType>("taskList", taskListSchema);
