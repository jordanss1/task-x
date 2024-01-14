import { motion } from "framer-motion";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { colors, placeholderVariants } from "../../../constants";
import { taskListSelector } from "../../../features/taskList/taskListSlice";
import { taskWallSelector } from "../../../features/taskWall/taskWallSlice";
import { TaskWallTaskType } from "../../../types";
import Spinner from "../../__reusable/Spinner";
import TaskWallPlaceholder from "./TaskWallPlaceholder";
import TaskWallTask from "./TaskWallTask";

const TaskWallUserTasks = ({
  userTaskWallTasks,
}: {
  userTaskWallTasks: TaskWallTaskType[] | false | null;
}): ReactElement => {
  const { taskWallFetching } = useSelector(taskWallSelector);
  const { taskListFetching } = useSelector(taskListSelector);

  const fetching = taskWallFetching || taskListFetching;

  const BigSpinner = (
    <div
      style={{ background: "rgba(0,0,0,.3)" }}
      className="fixed rounded-full z-[100] inset-0 m-auto p-9 w-fit h-fit flex justify-center items-center"
    >
      <Spinner size="large" color={colors.purple} />
    </div>
  );

  const renderTasks = () => {
    if (userTaskWallTasks === null) {
      return (
        <div
          style={{ background: "rgba(0,0,0,.3)" }}
          className="fixed rounded-full z-[100] inset-0 m-auto p-9 w-fit h-fit flex justify-center items-center"
        >
          <Spinner size="large" color={colors.purple} />
        </div>
      );
    } else if (userTaskWallTasks === false) {
      return (
        <>
          {fetching && BigSpinner}
          <motion.div
            variants={placeholderVariants}
            custom={fetching}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex justify-center py-10"
          >
            <TaskWallPlaceholder key={2} category="user" />
          </motion.div>
        </>
      );
    } else {
      return (
        <>
          {fetching && BigSpinner}
          <div
            className="flex max-w-3xl mr-auto ml-auto flex-col gap-8 items-center py-20"
            key={3}
          >
            {userTaskWallTasks.map((task) => (
              <TaskWallTask key={task.taskId} task={task} />
            ))}
          </div>
        </>
      );
    }
  };

  return <>{renderTasks()}</>;
};

export default TaskWallUserTasks;
