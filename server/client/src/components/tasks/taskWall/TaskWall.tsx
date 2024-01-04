import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { taskWallSelector } from "../../../features/taskWall/taskWallSlice";
import TaskWallTask from "./TaskWallTask";
import TaskWallNav from "./taskWallNav/TaskWallNav";

const TaskWall = (): ReactElement => {
  const { allTaskWallTasks } = useSelector(taskWallSelector);

  return (
    <section className="flex max-w-3xl mr-auto ml-auto flex-col gap-8 items-center py-20">
      <TaskWallNav />
      {allTaskWallTasks &&
        allTaskWallTasks?.map((task, i) => (
          <TaskWallTask key={i} task={task} />
        ))}
    </section>
  );
};

export default TaskWall;
