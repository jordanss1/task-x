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

const TaskWallNav = (): ReactElement => {
  const { category } = useSelector(taskWallSelector);

  return (
    <div className="task_wall_nav flex w-full pb-2">
      <TaskWallNavCategory category={category} />
      {category === "all" ? <TaskWallNavSort /> : null}
    </div>
  );
};

export default TaskWallNav;
