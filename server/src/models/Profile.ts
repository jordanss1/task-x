import { InferSchemaType, Schema } from "mongoose";

export const profileSchema = new Schema({
  _user: { type: String, required: true },
  userName: { type: String, required: true },
  nameLowerCase: { type: String, required: true },
  profilePicture: { type: String, required: true },
});

export type ProfileType = InferSchemaType<typeof profileSchema>;
