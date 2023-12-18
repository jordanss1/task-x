import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import setRandomInterval from "set-random-interval";
import { AppThunkDispatch } from "../app/store";
import {
  interfaceSelector,
  setFetching,
  updateProgress,
} from "../features/interface/interfaceSlice";

type ArtificialProgressOptions = {
  onFullProgress?: () => void;
};

type UseArtificialProgressType = (options: ArtificialProgressOptions) => {
  beginProgress: () => void;
  stopProgress: () => void;
  progress: number;
  complete: boolean;
};

const randomProgressNumber = (): number => {
  return Math.floor(10 + Math.random() * (25 - 10 + 1));
};

const useArtificialProgress: UseArtificialProgressType = (options) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const { progress, isFetching } = useSelector(interfaceSelector);

  const { onFullProgress } = options;

  const timer = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      dispatch(updateProgress(0));
      dispatch(setFetching(false));
      timer.current && timer.current();
    };
  }, []);

  useEffect(() => {
    if (progress >= 70 && isFetching) {
      dispatch(setFetching(false));
    }

    if (progress === 100 && onFullProgress) {
      onFullProgress();
    }
  }, [progress]);

  useEffect(() => {
    if (isFetching) {
      const { clear } = setRandomInterval(
        () => {
          dispatch(updateProgress(randomProgressNumber()));
        },
        200,
        600
      );

      timer.current = clear;
    } 
  }, [isFetching]);

  const beginProgress = () => dispatch(setFetching(true));

  const stopProgress = () => {
    if (isFetching) dispatch(setFetching(false));

    dispatch(updateProgress(100));
  };

  const complete = progress === 100;

  return { beginProgress, stopProgress, progress, complete };
};

export default useArtificialProgress;
