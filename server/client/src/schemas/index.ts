import * as yup from "yup";
import { axiosCheckUsername } from "../api";

export const taskSchema = yup.object().shape({
  task: yup
    .string()
    .max(80, "Must be less than 80 characters")
    .required("You must enter a task"),
  enabledDueDate: yup.boolean().required("Required"),
  dueDate: yup.date().when("enabledDueDate", (value) => {
    if (value[0]) {
      return yup.date().required();
    } else {
      return yup.date().optional();
    }
  }),
  onTaskWall: yup.boolean().required("Choose your task's visibility"),
});

export type TaskSchemaType = yup.InferType<typeof taskSchema>;

let timer: NodeJS.Timeout;

export const profileSchema = yup.object().shape({
  profilePhoto: yup.string().required("Choose a profile photo"),
  userName: yup
    .string()
    .min(3, "Must be more than 2 characters")
    .max(24, "Must be less than 25 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "No special characters or space")
    .required("You must enter a username")
    .test("userList", "Username is taken", async (value, context) => {
      if (value.length < 3) return false;

      if (timer) clearTimeout(timer);

      await new Promise((resolve) => (timer = setTimeout(resolve, 2000)));

      return !(await axiosCheckUsername(value));
    }),
});

export type ProfileSchemaType = yup.InferType<typeof profileSchema>;
