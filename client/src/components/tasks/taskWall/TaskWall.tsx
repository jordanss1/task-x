import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { taskWallSelector } from "../../../features/taskWall/taskWallSlice";
import TaskWallNav from "./TaskWallNav";
import TaskWallTask from "./TaskWallTask";

const TaskWall = (): ReactElement => {
  const { taskWallTasks } = useSelector(taskWallSelector);

  return (
    <section className="flex max-w-3xl mr-auto ml-auto flex-col gap-8 items-center py-20">
      <TaskWallNav />
      {taskWallTasks?.map((task, i) => (
        <TaskWallTask key={i} task={task} />
      ))}
    </section>
  );
};

export default TaskWall;
