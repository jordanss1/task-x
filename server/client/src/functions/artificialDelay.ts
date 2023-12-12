import axios from "axios";
import { MutableRefObject } from "react";
import { AppThunkDispatch } from "../app/store";

type ArtificialDelayType = (
  action?: Promise<any> | AppThunkDispatch,
  setProgress?: () => void,
  progress?: null | number,
  timer?: MutableRefObject<number | NodeJS.Timeout>
) => Promise<any> | void;

const artificialDelay: ArtificialDelayType = async (
  action,
  setProgress,
  progress,
  timer
) => {
  clearInterval(timer?.current);

  if (setProgress && progress && progress < 70 && timer?.current) {
    timer.current = setInterval(() => {});
  }

  const [res] = await axios.all([
    action ? action : () => {},
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);

  clearInterval(timer?.current);

  if (res) return res;
};

export default artificialDelay;
