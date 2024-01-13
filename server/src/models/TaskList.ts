import { InferSchemaType, Schema, Types, model } from "mongoose";

export const taskSchema = new Schema({
  task: { required: true, type: String },
  taskId: { required: true, type: String },
  enabledDueDate: { required: true, type: Boolean },
  dueDate: { required: false, type: String, default: undefined },
  created: { required: true, type: String },
  onTaskWall: { required: true, type: Boolean },
  complete: { required: true, type: Boolean, default: false },
});

export const taskListSchema = new Schema({
  _user: { required: true, type: Schema.Types.ObjectId, ref: "User" },
  tasks: { required: true, type: [taskSchema], default: null },
  totalTasks: { required: true, type: Number, default: 0 },
});

export type TaskType = InferSchemaType<typeof taskSchema>;

export type TaskTypeIncoming = Omit<TaskType, "taskId" | "created">;

export type TaskListType = InferSchemaType<typeof taskListSchema>;

model<TaskListType>("taskList", taskListSchema);
model<TaskType>("task", taskSchema);
