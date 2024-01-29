import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppThunkDispatch } from "../../../../app/store";
import { colors, fonts, placeholderVariants } from "../../../../constants";
import {
  getNotifications,
  notificationSelector,
  setNotificationId,
  updateNotificationStatus,
} from "../../../../features/notification/notificationSlice";
import {
  getAllTaskWallTasks,
  getUserWallTasks,
  taskWallSelector,
} from "../../../../features/taskWall/taskWallSlice";
import { TaskWallTaskType } from "../../../../types";
import Popup from "../../../__reusable/Popup";
import Spinner from "../../../__reusable/Spinner";
import TaskWallTask from "../TaskWallTask";
import TaskWallNotificationNav from "./TaskWallNotificationNav";

const TaskWallNotificationTask = (): ReactElement => {
  const { notificationFetching, notificationId } =
    useSelector(notificationSelector);
  const dispatch = useDispatch<AppThunkDispatch>();
  const [params] = useSearchParams();
  const [notificationTask, setNotificationTask] = useState<
    TaskWallTaskType | false | null
  >(null);

  const { taskWallFetching, allTaskWallTasks, taskWallPrompt } =
    useSelector(taskWallSelector);

  useEffect(() => {
    if (!notificationId) {
      dispatch(setNotificationId(params.get("taskId")));
    }

    if (notificationId) {
      dispatch(updateNotificationStatus(notificationId));
    }
  }, [notificationId]);

  useEffect(() => {
    if (allTaskWallTasks && notificationId) {
      const task =
        allTaskWallTasks.find(({ taskId }) => taskId === notificationId) ||
        false;

      setNotificationTask(task);
    }
  }, [allTaskWallTasks, notificationId]);

  useEffect(() => {
    dispatch(getAllTaskWallTasks());
    dispatch(getUserWallTasks());
    dispatch(getNotifications());
  }, []);

  const BigSpinner = (
    <div
      style={{ background: "rgba(0,0,0,.3)" }}
      className="fixed rounded-full z-[100] inset-0 m-auto p-9 w-fit h-fit flex justify-center items-center"
    >
      <Spinner size="large" color={colors.purple} />
    </div>
  );

  const renderTask = () => {
    if (notificationTask === null) {
      return (
        <motion.div
          key={1}
          className="fixed rounded-full z-[100] inset-0 m-auto p-9 w-fit h-fit flex justify-center items-center"
          exit={{ opacity: 0, transition: { delay: 1 } }}
        >
          <Spinner size="large" color={colors.purple} />
        </motion.div>
      );
    } else if (notificationTask === false) {
      return (
        <>
          {notificationFetching && BigSpinner}
          <motion.div
            key={2}
            variants={placeholderVariants}
            custom={notificationFetching}
            style={{
              fontFamily: fonts.jura,
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-lg  flex items-center justify-center text-center py-20"
          >
            This task does not exist or could not be found.
          </motion.div>
        </>
      );
    } else {
      return (
        <>
          <AnimatePresence mode="wait">
            {taskWallPrompt && <Popup prompt={taskWallPrompt} />}
          </AnimatePresence>
          <motion.div
            key={3}
            animate={{
              filter:
                taskWallFetching || notificationFetching
                  ? "blur(5px)"
                  : "blur(0px)",
              scaleX: taskWallFetching || notificationFetching ? 0.97 : 1,
              scaleY: taskWallFetching || notificationFetching ? 0.99 : 1,
              transition: {
                scale: { type: "tween", ease: "easeIn" },
              },
            }}
            className="py-20"
          >
            {(notificationFetching || taskWallFetching) && BigSpinner}
            <TaskWallTask taskItem={notificationTask} />
          </motion.div>
        </>
      );
    }
  };

  return (
    <section className="max-w-3xl  mr-auto ml-auto flex-col gap-8 items-center py-20">
      <TaskWallNotificationNav />
      <AnimatePresence mode="wait">{renderTask()}</AnimatePresence>
    </section>
  );
};

export default TaskWallNotificationTask;
