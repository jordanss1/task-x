import { ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fonts } from "../../../../constants";
import { taskWallSelector } from "../../../../features/taskWall/taskWallSlice";
import artificialDelay from "../../../../functions/artificialDelay";
import useArtificialProgress from "../../../../hooks/useArtificialProgress";
import SmallIcon from "../../../__reusable/SmallIcon";
import TaskWallNavCategory from "./TaskWallNavCategory";
import TaskWallNavSort from "./TaskWallNavSort";

type TaskWallNavPropsType = {
  notificationTask: boolean;
  handleClick: () => void;
};

const TaskWallNav = ({
  notificationTask,
  handleClick,
}: TaskWallNavPropsType): ReactElement => {
  const { category } = useSelector(taskWallSelector);
  const timer = useRef<NodeJS.Timeout | number>(0);
  const navigate = useNavigate();
  const { beginProgress, stopProgress, resetProgress } = useArtificialProgress({
    onFullProgress: () => setTimeout(() => handleClick(), 300),
  });

  useEffect(() => {
    return () => {
      setTimeout(() => resetProgress(), 300);
    };
  }, []);

  return (
    <div className="task_wall_nav flex w-full pb-2">
      {notificationTask ? (
        <div
          onClick={async () =>
            await artificialDelay(timer, undefined, beginProgress, stopProgress)
          }
          className="flex items-center gap-1 cursor-pointer"
        >
          <SmallIcon size={8} icon="fa-solid fa-chevron-left" />
          <span className="text-md" style={{ fontFamily: fonts.jura }}>Task Wall</span>
        </div>
      ) : (
        <>
          <TaskWallNavCategory category={category} />
          {category === "all" ? <TaskWallNavSort /> : null}
        </>
      )}
    </div>
  );
};

export default TaskWallNav;
