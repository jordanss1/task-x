import { ReactElement } from "react";
import TaskWallNavCategory from "./TaskWallNavCategory";
import TaskWallNavSort from "./TaskWallNavSort";

const TaskWallNav = (): ReactElement => {
  return (
    <div className="task_wall_nav flex w-full pb-2">
      <TaskWallNavCategory />
      <TaskWallNavSort />
    </div>
  );
};

export default TaskWallNav;
