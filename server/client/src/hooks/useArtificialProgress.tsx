import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setRandomInterval from "set-random-interval";
import { AppThunkDispatch } from "../app/store";
import {
  interfaceSelector,
  updateProgress,
} from "../features/interface/interfaceSlice";

type ArtificialProgressOptions = {
  onFullProgress?: () => void;
};

type UseArtificialProgressType = (options: ArtificialProgressOptions) => {
  beginProgress: () => void;
  stopProgress: () => void;
  progress: number;
};

const randomProgressNumber = (): number => {
  return Math.floor(10 + Math.random() * (25 - 10 + 1));
};

const useArtificialProgress: UseArtificialProgressType = (options) => {
  const [execution, setExecution] = useState(false);

  const dispatch = useDispatch<AppThunkDispatch>();
  const { progress } = useSelector(interfaceSelector);

  const { onFullProgress } = options;

  const timer = useRef<{ clear: () => void }>({ clear: () => {} });

  useEffect(() => {
    if (progress >= 70 && execution) {
      setExecution(false);
    }

    if (progress === 100 && onFullProgress) {
      onFullProgress();
    }
  }, [progress]);

  useEffect(() => {
    if (execution) {
      const { clear } = setRandomInterval(
        () => {
          dispatch(updateProgress(randomProgressNumber()));
        },
        200,
        600
      );

      timer.current.clear = clear;
    } else {
      timer.current.clear();
    }

    return () => timer.current.clear();
  }, [execution]);

  const beginProgress = () => setExecution(true);

  const stopProgress = () => {
    if (execution) setExecution(false);

    dispatch(updateProgress(100));
  };

  return { beginProgress, stopProgress, progress };
};

export default useArtificialProgress;
