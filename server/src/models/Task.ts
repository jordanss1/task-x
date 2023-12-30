import { InferSchemaType, Schema } from "mongoose";

export const taskSchema = new Schema({
  task: { required: true, type: String },
  taskId: { required: true, type: String, default: null },
  enabledDueDate: { required: true, type: Boolean },
  dueDate: { required: false, type: Date },
  created: { required: true, type: Date },
  onTaskWall: { required: true, type: Boolean },
});

export type TaskType = InferSchemaType<typeof taskSchema>;
