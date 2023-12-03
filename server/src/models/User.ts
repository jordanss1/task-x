import { InferSchemaType, Schema, model } from "mongoose";
import { userDetailsSchema } from "./UserDetails";

export const userSchema = new Schema({
  googleId: { type: String, required: true },
  userDetails: userDetailsSchema,
});

model("users", userSchema);

export type UserType = InferSchemaType<typeof userSchema>;
