import { InferSchemaType, Schema } from "mongoose";

export const userDetailsSchema = new Schema({
  userName: { type: String, required: true },
  profilePicture: { type: String, required: true },
  _user: { type: Schema.ObjectId, ref: "User", required: true },
});

export type UserDetailsType = InferSchemaType<typeof userDetailsSchema>;
