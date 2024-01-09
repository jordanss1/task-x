import axios from "axios";
import {
  TaskType,
  TaskTypeSent,
  TaskWallTaskType,
  UserType,
  ValidUserType,
} from "../types";

const createAxios = (cookies: boolean) =>
  axios.create({
    baseURL: "/api",
    withCredentials: cookies,
  });

export const axiosGetProfileIcons = async (): Promise<string[]> => {
  const api = createAxios(false);

  const { data } = await api.get(`/assets/profileIcons`);

  return data;
};

export const axiosGetAwardIcons = async (): Promise<string[]> => {
  const api = createAxios(false);

  const { data } = await api.get(`/assets/awardIcons`);

  return data;
};

export const axiosFetchUser = async () => {
  const api = createAxios(false);

  const { data } = await api.get(`/current_user`);

  return data;
};

export const axiosCheckUsername = async (
  username: string
): Promise<boolean> => {
  const api = createAxios(true);

  const { data } = await api.post(`/username_check`, { username });

  return data;
};

export const axiosUpdateProfile = async (
  profile: ValidUserType["profile"]
): Promise<UserType> => {
  const api = createAxios(true);

  const { data } = await api.post("/profileUpdate", { ...profile });

  return data;
};

export type SubmitTaskReturnType = [
  TaskType[] | false,
  TaskWallTaskType[] | false,
  TaskWallTaskType[] | false
];

export const axiosSubmitTask = async (
  task: TaskTypeSent
): Promise<SubmitTaskReturnType> => {
  const api = createAxios(true);

  const { data } = await api.post("/task", { ...task });

  return data;
};

export const axiosDeleteTask = async (
  taskId: TaskType["taskId"]
): Promise<SubmitTaskReturnType> => {
  const api = createAxios(true);

  const { data } = await api.delete("/task", { data: { taskId } });

  return data;
};

export const axiosCompleteTask = async (
  taskId: TaskType["taskId"]
): Promise<SubmitTaskReturnType> => {
  const api = createAxios(true);

  const { data } = await api.post("/task/complete", { taskId });

  return data;
};

export const axiosGetUserTasks = async (): Promise<TaskType[] | false> => {
  const api = createAxios(true);

  const { data } = await api.get("/tasks/user");

  return data;
};

export const axiosGetUserWallTasks = async (): Promise<
  TaskWallTaskType[] | false
> => {
  const api = createAxios(true);

  const { data } = await api.get("/wall_tasks/user");

  return data;
};

export const axiosGetAllTaskWallTasks = async (): Promise<
  TaskWallTaskType[] | false
> => {
  const api = createAxios(true);

  const { data } = await api.get("/wall_tasks/all");

  return data;
};
