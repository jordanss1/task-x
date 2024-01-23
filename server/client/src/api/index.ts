import axios from "axios";
import {
  AllTasksReturnType,
  CommentReturnType,
  CommentType,
  DeleteCommentReturnType,
  EditCommentRequestType,
  LikeCommentRequestType,
  LikeTaskRequestType,
  NewCommentRequestType,
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

export const axiosCreateProfile = async (
  profile: Omit<ValidUserType["profile"], "_user">
): Promise<UserType> => {
  const api = createAxios(true);

  const { data } = await api.post("/profile", { ...profile });

  return data;
};

export const axiosDeleteProfile = async (): Promise<void> => {
  const api = createAxios(true);

  const { data } = await api.delete("/profile");

  return data;
};

export const axiosUpdateProfile = async (
  profile: Omit<ValidUserType["profile"], "_user">
): Promise<ValidUserType> => {
  const api = createAxios(true);

  const { data } = await api.patch("/profile", { ...profile });

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

export const axiosUpdateUserProfileContent = async (): Promise<
  [TaskWallTaskType[] | false, TaskWallTaskType[] | false]
> => {
  const api = createAxios(true);

  const { data } = await api.patch("/task_wall");

  return data;
};

export const axiosSubmitComment = async (
  comment: NewCommentRequestType
): Promise<CommentReturnType | null> => {
  const api = createAxios(true);

  const { data } = await api.post("/task_wall/comment", comment);

  return data;
};

export const axiosEditComment = async (
  comment: EditCommentRequestType
): Promise<CommentReturnType | null> => {
  const api = createAxios(true);

  const { data } = await api.patch("/task_wall/comment", comment);

  return data;
};

export const axiosDeleteComment = async (
  comment: Omit<EditCommentRequestType, "comment">
): Promise<DeleteCommentReturnType | null> => {
  const api = createAxios(true);

  const { data } = await api.delete("/task_wall/comment", { data: comment });

  return data;
};

export const axiosLikeTask = async (
  like: LikeTaskRequestType
): Promise<TaskWallTaskType> => {
  const api = createAxios(true);

  const { data } = await api.post("/task_wall/task/like", like);

  return data;
};

export const axiosLikeComment = async (
  like: LikeCommentRequestType
): Promise<CommentReturnType> => {
  const api = createAxios(true);

  const { data } = await api.post("/task_wall/comment/like", like);

  return data;
};
