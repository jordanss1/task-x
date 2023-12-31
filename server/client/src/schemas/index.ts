import * as yup from "yup";
import { axiosCheckUsername } from "../api";

export const taskSchema = yup.object().shape({
  task: yup
    .string()
    .max(80, "Must be less than 80 characters")
    .required("You must enter a task"),
  enabledDueDate: yup.boolean().required("Required"),
  dueDate: yup.string().when("enabledDueDate", (value) => {
    if (value[0]) {
      return yup.string().required();
    } else {
      return yup.string().optional();
    }
  }),
  onTaskWall: yup.boolean().required("Choose your task's visibility"),
});

export type TaskSchemaType = yup.InferType<typeof taskSchema>;

let timer: NodeJS.Timeout;

export const profileSchema = yup.object().shape({
  profilePicture: yup.string().required("Choose a profile photo"),
  userName: yup
    .string()
    .min(3, "Must be more than 2 characters")
    .max(24, "Must be less than 25 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "No special characters or space")
    .required("You must enter a username")
    .test("userList", "Username is taken", async (value, context) => {
      if (value.length < 3) return false;

      return !(await axiosCheckUsername(value));
    }),
});

export type ProfileSchemaType = yup.InferType<typeof profileSchema>;
