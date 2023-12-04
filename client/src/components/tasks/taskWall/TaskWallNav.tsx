import { ReactElement } from "react";
import TaskWallNavSort from "./TaskWallNavSort";

const TaskWallNav = (): ReactElement => {
  return (
    <div className="task_wall_nav w-full pb-2">
      <TaskWallNavSort />
    </div>
  );
};

export default TaskWallNav;
