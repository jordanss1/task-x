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

const userNames = ["love", "five", "test"];

const fakePromise = (value: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const matches = userNames.filter((userName) => userName === value);
      resolve(matches);
    }, 2000);
  });
};

export const profileSchema = yup.object().shape({
  profilePhoto: yup.string().required("Choose a profile photo"),
  userName: yup
    .string()
    .min(3, "Must be more than 2 characters")
    .max(14, "Must be less than 15 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "No special characters allowed")
    .required("You must enter a username")
    .test("userList", "Username is taken", async (value) => {
      if (value.length < 3) return false;

      const matches = await fakePromise(value);
      return !matches.length;
    }),
});

export type ProfileSchemaType = yup.InferType<typeof profileSchema>;
