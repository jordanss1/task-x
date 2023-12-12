import { InferSchemaType, Schema, model } from "mongoose";
import { userDetailsSchema } from "./UserDetails";

export const userSchema = new Schema({
  googleId: { type: String, required: true },
  userDetails: { type: userDetailsSchema, default: null, required: false },
});

model("users", userSchema);

export type UserType = InferSchemaType<typeof userSchema>;
