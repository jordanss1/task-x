import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../../app/store";
import { colors } from "../../../constants";
import {
  getUserTasks,
  taskListSelector,
} from "../../../features/taskList/taskListSlice";
import { TaskType } from "../../../types";
import Spinner from "../../__reusable/Spinner";
import TaskListPlaceholder from "./TaskListPlaceholder";
import TaskListTask from "./TaskListTask";

const TaskList = (): ReactElement => {
  const { tasks } = useSelector(taskListSelector);
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    if (!tasks) {
      dispatch(getUserTasks());
    }
  }, []);

  const renderTaskList = () => {
    if (tasks === null) {
      return (
        <motion.section>
          <Spinner size="large" color={colors.purple} />
        </motion.section>
      );
    } else if (tasks === false) {
      return (
        <motion.section className="h-[80vh]  rounded-xl flex justify-center items-center">
          <TaskListPlaceholder />
        </motion.section>
      );
    } else {
      return (
        <motion.section className="grid grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-8 justify-items-center py-20">
          {tasks.map((taskItem, i) => (
            <TaskListTask key={i} index={i} taskItem={taskItem} />
          ))}
        </motion.section>
      );
    }
  };

  return <AnimatePresence>{renderTaskList()}</AnimatePresence>;
};

export default TaskList;
