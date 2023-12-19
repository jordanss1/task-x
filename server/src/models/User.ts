import { InferSchemaType, Schema, model } from "mongoose";
import { profileSchema } from "./Profile";

export const userSchema = new Schema({
  googleId: { type: String, required: true },
  profile: { type: profileSchema, default: null, required: false },
});

model("users", userSchema);

export type UserType = InferSchemaType<typeof userSchema>;
