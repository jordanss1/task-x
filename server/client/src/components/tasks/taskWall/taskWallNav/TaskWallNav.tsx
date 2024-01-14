import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { taskWallSelector } from "../../../../features/taskWall/taskWallSlice";
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
