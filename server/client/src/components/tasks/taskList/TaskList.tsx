import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../../app/store";
import { colors, placeholderVariants } from "../../../constants";
import { getUser } from "../../../features/auth/authSlice";
import { getNotifications } from "../../../features/notification/notificationSlice";
import {
  getUserTasks,
  taskListSelector,
} from "../../../features/taskList/taskListSlice";
import {
  getUserWallTasks,
  taskWallSelector,
} from "../../../features/taskWall/taskWallSlice";
import ProgressBar from "../../__reusable/ProgressBar";
import Spinner from "../../__reusable/Spinner";
import TaskListCategory from "./TaskListCategory";
import TaskListPlaceholder from "./TaskListPlaceholder";

const TaskList = (): ReactElement => {
  const { tasks, taskListFetching } = useSelector(taskListSelector);
  const { userTaskWallTasks } = useSelector(taskWallSelector);
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getNotifications());

    if (tasks === null) {
      dispatch(getUserTasks());
    }

    if (userTaskWallTasks === null) {
      dispatch(getUserWallTasks());
    }
  }, []);

  const BigSpinner = (
    <div
      style={{ background: "rgba(0,0,0,.3)" }}
      className="fixed rounded-full z-[100] inset-0 m-auto p-9 w-fit h-fit flex justify-center items-center"
    >
      <Spinner size="large" color={colors.purple} />
    </div>
  );

  const renderTaskList = () => {
    if (tasks === null) {
      return (
        <motion.section
          key={1}
          className="h-[80vh]  rounded-xl flex justify-center items-center"
          exit={{ opacity: 0, transition: { delay: 0.5 } }}
        >
          <Spinner size="large" color={colors.purple} />
        </motion.section>
      );
    } else if (tasks === false) {
      return (
        <>
          {taskListFetching && BigSpinner}
          <motion.section
            key={2}
            variants={placeholderVariants}
            custom={taskListFetching}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-[80vh] rounded-xl flex justify-center items-center"
          >
            <TaskListPlaceholder />
          </motion.section>
        </>
      );
    } else {
      return (
        <div className="pb-14">
          {taskListFetching && BigSpinner}
          <TaskListCategory
            userTaskWallTasks={userTaskWallTasks}
            sortBy="Due"
          />
          <TaskListCategory
            userTaskWallTasks={userTaskWallTasks}
            sortBy="Not due"
          />
          <TaskListCategory
            userTaskWallTasks={userTaskWallTasks}
            sortBy="Complete"
          />
        </div>
      );
    }
  };

  return <AnimatePresence mode="wait">{renderTaskList()}</AnimatePresence>;
};

export default TaskList;
