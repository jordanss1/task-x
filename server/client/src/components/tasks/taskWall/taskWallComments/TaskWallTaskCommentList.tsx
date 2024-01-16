import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { CommentType, TaskWallTaskType } from "../../../../types";
import TaskWallTaskComment from "./TaskWallTaskComment";
import TaskWallTaskInput from "./TaskWallTaskInput";

type TaskWallTaskCommentListPropsType = {
  comments: CommentType[];
  taskId: TaskWallTaskType["taskId"];
};

const inputVariants: Variants = {
  initial: { opacity: 0, y: -60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: "tween", ease: "circOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
  },
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
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const TaskWallTaskCommentList = ({
  comments,
  taskId,
}: TaskWallTaskCommentListPropsType): ReactElement => {
  return (
    <>
      <motion.div
        variants={inputVariants}
        className="py-2 px-1 justify-center items-center w-full h-14"
      >
        <TaskWallTaskInput />
      </motion.div>
      <motion.div variants={listVariants} className="flex flex-col pb-1 px-1">
        {comments.map((comment, i) => (
          <TaskWallTaskComment key={i} taskId={taskId} commentItem={comment} />
        ))}
      </motion.div>
    </>
  );
};

export default TaskWallTaskCommentList;
