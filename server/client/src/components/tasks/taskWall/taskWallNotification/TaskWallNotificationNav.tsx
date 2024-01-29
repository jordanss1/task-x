import { ReactElement, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fonts } from "../../../../constants";
import artificialDelay from "../../../../functions/artificialDelay";
import useArtificialProgress from "../../../../hooks/useArtificialProgress";
import SmallIcon from "../../../__reusable/SmallIcon";

const TaskWallNotificationNav = (): ReactElement => {
  const timer = useRef<NodeJS.Timeout | number>(0);
  const navigate = useNavigate();
  const { beginProgress, stopProgress, resetProgress } = useArtificialProgress({
    onFullProgress: () => setTimeout(() => navigate("/dashboard/social"), 300),
  });

  useEffect(() => {
    return () => {
      setTimeout(() => resetProgress(), 300);
    };
  }, []);

  return (
    <div
      onClick={async () =>
        await artificialDelay(timer, undefined, beginProgress, stopProgress)
      }
      className="flex items-center gap-1 px-1 cursor-pointer"
    >
      <SmallIcon size={8} icon="fa-solid fa-chevron-left" />
      <span className="text-md" style={{ fontFamily: fonts.jura }}>
        Task Wall
      </span>
    </div>
  );
};

export default TaskWallNotificationNav;
