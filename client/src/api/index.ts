import axios, { AxiosRequestConfig } from "axios";
import keys from "../config/keys";

axios.defaults.baseURL = keys.server;

export const axiosGetProfileIcons = async (): Promise<string[]> => {
  const { data } = await axios.get(`/assets/profileIcons`);

  return data;
};

export const axiosGetAwardIcons = async (): Promise<string[]> => {
  const { data } = await axios.get(`/assets/awardIcons`);

  return data;
};

export const axiosFetchUser = async () => {
  const { data } = await axios.get(`/api/current_user`, {
    withCredentials: true,
  });

  return data;
};

export const axiosCheckUsername = async (
  username: string
): Promise<boolean> => {
  const { data } = await axios.post(
    `/api/username_check`,
    { username },
    {
      withCredentials: true,
    }
  );

  return data;
};
