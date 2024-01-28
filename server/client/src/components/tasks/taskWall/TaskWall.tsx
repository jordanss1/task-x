import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { taskWallSelector } from "../../../features/taskWall/taskWallSlice";
import TaskWallNotificationTask from "./TaskWallNotificationTask";
import TaskWallTasks from "./TaskWallTasks";
import TaskWallNav from "./taskWallNav/TaskWallNav";

export type TaskWallParamsType = {
  taskId: null | string;
  commentId: null | string;
};

const TaskWall = (): ReactElement => {
  const { category } = useSelector(taskWallSelector);
  const [urlParams] = useSearchParams();
  const [params, setParams] = useState<TaskWallParamsType>({
    taskId: null,
    commentId: null,
  });

  useEffect(() => {
    if (urlParams.get("taskId") || urlParams.get("commentId")) {
      setParams({
        taskId: urlParams.get("taskId"),
        commentId: urlParams.get("commentId"),
      });
    }
  }, [urlParams]);

  const { taskId, commentId } = params;

  const renderTasks =
    taskId || commentId ? (
      <TaskWallNotificationTask params={params} />
    ) : (
      <TaskWallTasks category={category} />
    );

  const handleClick = () => {
    setParams({ taskId: null, commentId: null });
  };

  const notificationTask = taskId || commentId ? true : false;

  return (
    <section className="max-w-3xl mr-auto ml-auto flex-col gap-8 items-center py-20">
      <TaskWallNav
        key={taskId}
        notificationTask={notificationTask}
        handleClick={handleClick}
      />
      {renderTasks}
    </section>
  );
};

export default TaskWall;
