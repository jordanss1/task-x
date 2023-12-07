import axios from "axios";
import keys from "../config/keys";

export const axiosGetProfileIcons = async (): Promise<string[]> => {
  const { data } = await axios.get(`${keys.server}/assets/profileIcons`);

  return data;
};

export const axiosGetAwardIcons = async (): Promise<string[]> => {
  const { data } = await axios.get(`${keys.server}/assets/awardIcons`);

  return data;
};

export const axiosFetchUser = async () => {
  const { data } = await axios.get(`${keys.server}/api/current_user`);

  return data;
};
