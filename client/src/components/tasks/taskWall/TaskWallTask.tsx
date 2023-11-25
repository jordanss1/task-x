import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactElement, useState } from "react";
import useMeasure from "react-use-measure";
import { TaskWallTaskType } from "../../../types";
import TaskWallTaskCommentList from "./taskWallComments/TaskWallTaskCommentList";
import TaskWallTaskInteraction from "./TaskWallTaskInteraction";
import TaskWallTaskStatus from "./TaskWallTaskStatus";
import TaskWallTaskTask from "./TaskWallTaskTask";

type TaskWallTaskPropsType = {
  task: TaskWallTaskType;
};

const listVariants: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      staggerDirection: 1,
    },
  },
  exit: {
    opacity: 1,
    height: "0",
    padding: "0px",
    transition: {
      orchestrate: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const TaskWallTask = ({ task }: TaskWallTaskPropsType): ReactElement => {
  const [openComments, setOpenComments] = useState(false);
  const [ref, { height }] = useMeasure();

  return (
    <motion.div
      style={{ boxShadow: "1px 1px 2px black, -1px -1px 2px black" }}
      className="sm:min-h-[15rem] w-full max-w-3xl flex flex-col gap-5 p-3 rounded-2xl"
    >
      <TaskWallTaskStatus
        awards={task.awards}
        dueDate={task.dueDate}
        created={task.created}
        user={task.user}
      />
      <TaskWallTaskTask task={task.task} />
      <TaskWallTaskInteraction
        likes={task.likes}
        created={task.created}
        openComments={openComments}
        handleComments={setOpenComments}
        commentAmount={task.comments.length}
      />
      <motion.section
        animate={{
          height,
          transition: {
            duration: openComments ? 0.6 : 0.2,
            type: "tween",
            ease: openComments ? "easeInOut" : "linear",
          },
        }}
        className="overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {openComments && (
            <motion.div
              variants={listVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key="comments"
              ref={ref}
              className="p-2 rounded-2xl overflow-hidden h-auto bg-slate-300 flex flex-col gap-2"
            >
              <TaskWallTaskCommentList comments={task.comments} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.div>
  );
};

export default TaskWallTask;
