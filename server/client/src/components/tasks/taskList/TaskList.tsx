import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../../app/store";
import { colors } from "../../../constants";
import {
  getUserTasks,
  taskListSelector,
} from "../../../features/taskList/taskListSlice";
import Spinner from "../../__reusable/Spinner";
import TaskListPlaceholder from "./TaskListPlaceholder";
import TaskListTask from "./TaskListTask";

const TaskList = (): ReactElement => {
  const { tasks, fetching } = useSelector(taskListSelector);
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    if (tasks === null) {
      dispatch(getUserTasks());
    }
  }, []);

  const BigSpinner = (
    <div
      style={{ background: "rgba(0,0,0,.3)" }}
      className="absolute rounded-full z-10 inset-0 m-auto p-[6px] w-fit h-fit flex justify-center items-center"
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
          {fetching && BigSpinner}
          <motion.section
            key={2}
            initial={{ y: 30, filter: "blur(10px)", scale: 0.9 }}
            animate={{
              y: 0,
              filter: fetching ? "blur(5px)" : "blur(0px)",
              scale: fetching ? 0.95 : 1,
              transition: {
                scale: { type: "spring", stiffness: 150 },
                y: { type: "spring", stiffness: 120 },
              },
            }}
            exit={{
              y: -20,
              filter: "blur(5px)",
              scale: 0.9,
              opacity: 0,
              transition: {
                scale: { type: "spring", stiffness: 200 },
                y: { type: "spring", stiffness: 120 },
              },
            }}
            className="h-[80vh] rounded-xl flex justify-center items-center"
          >
            <TaskListPlaceholder />
          </motion.section>
        </>
      );
    } else {
      return (
        <motion.section
          key={3}
          style={{
            justifyItems: tasks.length < 4 ? "left" : "center",
            gridTemplateColumns:
              tasks.length < 4
                ? "repeat(auto-fit, minmax(230px, 250px))"
                : "repeat(auto-fit, minmax(230px, 1fr))",
          }}
          className="grid gap-8 py-20 relative"
        >
          {fetching && BigSpinner}
          {tasks.map((taskItem, i) => (
            <TaskListTask key={i} index={i} taskItem={taskItem} />
          ))}
        </motion.section>
      );
    }
  };

  return <AnimatePresence mode="wait">{renderTaskList()}</AnimatePresence>;
};

export default TaskList;
