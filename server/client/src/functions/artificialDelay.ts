import axios from "axios";
import { MutableRefObject } from "react";
import { AppThunkDispatch } from "../app/store";

type ArtificialDelayType = (
  timer: MutableRefObject<number | NodeJS.Timeout>,
  action?: Promise<any> | AppThunkDispatch,
  beginProgress?: () => void,
  stopProgress?: () => void
) => Promise<any> | void;

const artificialDelay: ArtificialDelayType = async (
  timer,
  action,
  beginProgress,
  stopProgress
) => {
  clearTimeout(timer.current);

  if (beginProgress) beginProgress();

  const [res] = await axios.all([
    action ? action : () => {},

    new Promise(
      (resolve) =>
        (timer.current = setTimeout(
          () => resolve(stopProgress && stopProgress()),
          1200
        ))
    ),
  ]);

  return res;
};

export default artificialDelay;
