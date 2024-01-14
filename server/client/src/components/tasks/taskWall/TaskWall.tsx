import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../../app/store";
import {
  getAllTaskWallTasks,
  getUserWallTasks,
  taskWallSelector,
} from "../../../features/taskWall/taskWallSlice";
import TaskWallAllTasks from "./TaskWallAllTasks";
import TaskWallUserTasks from "./TaskWallUserTasks";
import TaskWallNav from "./taskWallNav/TaskWallNav";

const TaskWall = (): ReactElement => {
  const { allTaskWallTasks, userTaskWallTasks, category } =
    useSelector(taskWallSelector);

  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    if (allTaskWallTasks === null) {
      dispatch(getAllTaskWallTasks());
    }

    if (userTaskWallTasks === null) {
      dispatch(getUserWallTasks());
    }
  }, []);

  const renderTasks =
    category === "all" ? (
      <TaskWallAllTasks allTaskWallTasks={allTaskWallTasks} />
    ) : (
      <TaskWallUserTasks userTaskWallTasks={userTaskWallTasks} />
    );

  return (
    <section className="max-w-3xl mr-auto ml-auto flex-col gap-8 items-center py-20">
      <TaskWallNav />
      {renderTasks}
    </section>
  );
};

export default TaskWall;
