import * as yup from "yup";

export const newTaskSchema = yup.object().shape({
  task: yup.string().required("Enter task"),
  dueDate: yup.boolean().required("Required"),
  visibility: yup.boolean().required("Choose your task's visibility"),
});

export type NewTaskType = yup.InferType<typeof newTaskSchema>;
