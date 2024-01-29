import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { taskWallSelector } from "../../../features/taskWall/taskWallSlice";
import TaskWallTasks from "./TaskWallTasks";
import TaskWallNav from "./taskWallNav/TaskWallNav";

export type TaskWallParamsType = {
  taskId: null | string;
  commentId: null | string;
};

const TaskWall = (): ReactElement => {
  const { category } = useSelector(taskWallSelector);

  return (
    <section className="max-w-3xl mr-auto ml-auto flex-col gap-8 items-center py-20">
      <TaskWallNav />
      <TaskWallTasks category={category} />
    </section>
  );
};

export default TaskWall;
