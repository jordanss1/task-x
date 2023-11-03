import dayjs from "dayjs";
import * as yup from "yup";

const minDate = dayjs().add(1, "minute");

export const taskSchema = yup.object().shape({
  task: yup.string().required("Enter task"),
  enabledDueDate: yup.boolean().required("Required"),
  dueDate: yup.date().when("enabledDueDate", (value) => {
    if (value) {
      return yup.date().min(minDate, "Date must be in the future").required();
    } else return yup.date().optional();
  }),
  onTaskWall: yup.boolean().required("Choose your task's visibility"),
});

export type TaskSchemaType = yup.InferType<typeof taskSchema>;
