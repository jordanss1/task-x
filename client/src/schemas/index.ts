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
