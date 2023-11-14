import * as yup from "yup";

export const taskSchema = yup.object().shape({
  task: yup.string().required("You must enter a task"),
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

export const profileSchema = yup.object().shape({
  profilePhoto: yup.string().required("Choose a profile photo"),
  userName: yup
    .string()
    .min(3, "Username must be more than 2 characters")
    .max(14, "Username must be less than 15 characters")
    .required("You must enter a username"),
});

export type ProfileSchemaType = yup.InferType<typeof profileSchema>;
