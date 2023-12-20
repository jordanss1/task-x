import axios, { AxiosRequestConfig } from "axios";
import { UserType } from "../types";

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
  profile: NonNullable<UserType["profile"]>
): Promise<UserType> => {
  const api = createAxios(true);

  const { data } = await api.post("/profileUpdate", { ...profile });

  return data;
};
