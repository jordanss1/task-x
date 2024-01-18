import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../../app/store";
import { colors, placeholderVariants } from "../../../constants";
import { getUser } from "../../../features/auth/authSlice";
import { taskListSelector } from "../../../features/taskList/taskListSlice";
import {
  getAllTaskWallTasks,
  getUserWallTasks,
  taskWallSelector,
} from "../../../features/taskWall/taskWallSlice";
import Popup from "../../__reusable/Popup";
import Spinner from "../../__reusable/Spinner";
import TaskWallPlaceholder from "./TaskWallPlaceholder";
import TaskWallTask from "./TaskWallTask";

const TaskWallTasks = ({
  category,
}: {
  category: "all" | "user";
}): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const {
    taskWallFetching,
    userTaskWallTasks,
    allTaskWallTasks,
    taskWallPrompt,
  } = useSelector(taskWallSelector);

  const { taskListFetching } = useSelector(taskListSelector);

  const fetching = taskWallFetching || taskListFetching;

  const tasks = category === "all" ? allTaskWallTasks : userTaskWallTasks;

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (category === "all" && allTaskWallTasks === null) {
      dispatch(getAllTaskWallTasks());
    }

    if (category === "user" && userTaskWallTasks === null) {
      dispatch(getUserWallTasks());
    }
  }, [category]);

  const BigSpinner = (
    <div
      style={{ background: "rgba(0,0,0,.3)" }}
      className="fixed rounded-full z-[100] inset-0 m-auto p-9 w-fit h-fit flex justify-center items-center"
    >
      <Spinner size="large" color={colors.purple} />
    </div>
  );

  const renderTasks = () => {
    if (tasks === null) {
      return (
        <motion.div key={1} exit={{ opacity: 0, transition: { delay: 0.5 } }}>
          {BigSpinner}
        </motion.div>
      );
    } else if (tasks === false) {
      return (
        <>
          {fetching && BigSpinner}
          <motion.div
            key={2}
            variants={placeholderVariants}
            custom={fetching}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex justify-center py-10"
          >
            <TaskWallPlaceholder key={2} category={category} />
          </motion.div>
        </>
      );
    } else {
      return (
        <>
          {fetching && BigSpinner}
          <AnimatePresence mode="wait">
            {taskWallPrompt && <Popup prompt={taskWallPrompt} />}
          </AnimatePresence>
          <motion.div
            animate={{
              filter: fetching ? "blur(5px)" : "blur(0px)",
              scaleX: fetching ? 0.97 : 1,
              scaleY: fetching ? 0.99 : 1,
              transition: {
                scale: { type: "tween", ease: "easeIn" },
              },
            }}
            className="flex max-w-3xl mr-auto ml-auto flex-col gap-8 items-center py-20"
            key={3}
          >
            {tasks.map((task) => (
              <TaskWallTask key={task.taskId} taskItem={task} />
            ))}
          </motion.div>
        </>
      );
    }
  };

  return <AnimatePresence mode="wait">{renderTasks()}</AnimatePresence>;
};

export default TaskWallTasks;
