import { useEffect, useRef, useState } from "react";
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
  const [progress, setProgress] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();

  const { onFullProgress } = options;

  const timer = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      setProgress(0);
      setIsFetching(false);
      dispatch(updateProgress(0));
      timer.current && timer.current();
    };
  }, []);

  useEffect(() => {
    if (progress) dispatch(updateProgress(progress));

    if (progress >= 70 && isFetching) {
      setIsFetching(false);
    }

    if (progress === 100 && onFullProgress) {
      onFullProgress();
    }
  }, [progress]);

  useEffect(() => {
    if (isFetching) {
      const { clear } = setRandomInterval(
        () => {
          setProgress(randomProgressNumber);
        },
        200,
        600
      );

      timer.current = clear;
    }
  }, [isFetching]);

  const beginProgress = () => setIsFetching(true);

  const stopProgress = () => {
    if (isFetching) setIsFetching(false);

    timer.current && timer.current();

    setProgress(100);
  };

  const complete = progress === 100;

  return { beginProgress, stopProgress, progress, complete };
};

export default useArtificialProgress;
