import { InferSchemaType, Schema } from "mongoose";
import { userSchema } from "./User";

export const commentSchema = new Schema({
  user: { required: true, type: userSchema },
  comment: { required: true, type: String },
  likes: { required: true, type: Number },
});

export type CommentType = InferSchemaType<typeof commentSchema>;
