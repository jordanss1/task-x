import { InferSchemaType, Schema } from "mongoose";

export const profileSchema = new Schema({
  userName: { type: String, required: true },
  profilePicture: { type: String, required: true },
});
  
export type ProfileType = InferSchemaType<typeof profileSchema>;
