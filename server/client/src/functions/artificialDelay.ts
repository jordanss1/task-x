import axios from 'axios';
import { RefObject } from 'react';

type ArtificialDelayType = (
  timer: RefObject<number | NodeJS.Timeout>,
  action?: () => void,
  beginProgress?: () => void,
  stopProgress?: () => void
) => Promise<any> | void;

const artificialDelay: ArtificialDelayType = async (
  timer,
  action,
  beginProgress,
  stopProgress
) => {
  const func = action ? action : () => {};

  clearTimeout(timer.current);

  if (beginProgress) beginProgress();

  const [res] = await axios.all([
    new Promise((resolve) => resolve(func())),

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
