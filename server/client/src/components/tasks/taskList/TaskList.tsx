import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { TaskType } from "../../../types";
import TaskListPlaceholder from "./TaskListPlaceholder";
import TaskListTask from "./TaskListTask";

const TaskList = (): ReactElement => {
  const [tasks, setTasks] = useState([]);

  return (
    <AnimatePresence>
      {tasks.length ? (
        <motion.section className="grid grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-8 justify-items-center py-20">
          {tasks.map((taskItem, i) => (
            <TaskListTask key={i} index={i} taskItem={taskItem} />
          ))}
        </motion.section>
      ) : (
        <motion.section className="h-[80vh] flex justify-center items-center">
          <TaskListPlaceholder />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default TaskList;
