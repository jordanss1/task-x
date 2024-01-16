import axios from "axios";
import {
  TaskType,
  TaskTypeSent,
  TaskWallTaskType,
  UserType,
  ValidUserType,
} from "../types";

export type AllTasksReturnType = [
  TaskType[] | false,
  TaskWallTaskType[] | false,
  TaskWallTaskType[] | false
];

export type SendLikeRequestType = {
  previousLikes: number;
  currentlyLiked: boolean;
  currentAwards: TaskWallTaskType["awards"];
  taskId: TaskWallTaskType["taskId"];
};

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

export const axiosSubmitTask = async (
  task: TaskTypeSent
): Promise<AllTasksReturnType> => {
  const api = createAxios(true);

  const { data } = await api.post("/task", { ...task });

  return data;
};

export const axiosEditTask = async (
  task: TaskType
): Promise<AllTasksReturnType> => {
  const api = createAxios(true);

  const { data } = await api.post("/task/edit", { ...task });

  return data;
};

export const axiosDeleteTask = async (
  taskId: TaskType["taskId"]
): Promise<AllTasksReturnType> => {
  const api = createAxios(true);

  const { data } = await api.delete("/task", { data: { taskId } });

  return data;
};

export const axiosCompleteTask = async (
  taskId: TaskType["taskId"]
): Promise<AllTasksReturnType> => {
  const api = createAxios(true);

  const { data } = await api.post("/task/complete", { taskId });

  return data;
};

export const axiosGetUserTasks = async (): Promise<TaskType[] | false> => {
  const api = createAxios(true);

  const { data } = await api.get("/tasks");

  return data;
};

export const axiosGetUserWallTasks = async (): Promise<
  TaskWallTaskType[] | false
> => {
  const api = createAxios(true);

  const { data } = await api.get("/task_wall/user");

  return data;
};

export const axiosGetAllTaskWallTasks = async (): Promise<
  TaskWallTaskType[] | false
> => {
  const api = createAxios(true);

  const { data } = await api.get("/task_wall/all");

  return data;
};

export const axiosLikeTask = async (
  like: SendLikeRequestType
): Promise<TaskWallTaskType> => {
  const api = createAxios(true);

  const { data } = await api.post("/task_wall/like", like);

  return data;
};
