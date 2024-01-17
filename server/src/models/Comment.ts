import { InferSchemaType, Schema, model } from "mongoose";
import { profileSchema } from "./Profile";
import { userSchema } from "./User";

export const commentSchema = new Schema({
  user: { required: true, type: userSchema },
  comment: { required: true, type: String },
  likes: {
    likes: { required: false, type: Number, default: 0 },
    users: { required: false, type: [profileSchema], default: [] },
  },
  created: { required: true, type: String },
});

export type CommentType = InferSchemaType<typeof commentSchema>;

model<CommentType>("comment", commentSchema);
