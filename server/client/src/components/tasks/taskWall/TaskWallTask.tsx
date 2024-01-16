import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMeasure from "react-use-measure";
import { AppThunkDispatch } from "../../../app/store";
import { colors } from "../../../constants";
import { authSelector } from "../../../features/auth/authSlice";
import { sendLike } from "../../../features/taskWall/taskWallSlice";
import { TaskWallTaskType } from "../../../types";
import TaskWallTaskCommentList from "./taskWallComments/TaskWallTaskCommentList";
import TaskWallTaskStatus from "./taskWallStatus/TaskWallTaskStatus";
import TaskWallTaskInteraction from "./TaskWallTaskInteraction";
import TaskWallTaskText from "./TaskWallTaskText";

type TaskWallTaskPropsType = {
  taskItem: TaskWallTaskType;
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

const TaskWallTask = ({ taskItem }: TaskWallTaskPropsType): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const auth = useSelector(authSelector);
  const [openComments, setOpenComments] = useState(false);
  const [ref, { height }] = useMeasure();

  const {
    likes,
    awards,
    taskId,
    dueDate,
    created,
    complete,
    comments,
    user,
    task,
  } = taskItem;

  const currentlyLiked = likes.users.some(({ userName }) => {
    if (auth.user) {
      return userName === auth.user.profile?.userName;
    }
  });

  const handleLike = async () => {
    await dispatch(
      sendLike({
        currentlyLiked,
        currentAwards: awards,
        previousLikes: likes.likes,
        taskId: taskId,
      })
    );
  };

  return (
    <motion.div
      style={{
        boxShadow: "1px 1px 2px black, -1px -1px 2px black",
        background: "#ebe7e4",
      }}
      className="sm:min-h-[15rem] w-full flex flex-col gap-5 p-3 rounded-2xl"
    >
      <TaskWallTaskStatus
        awards={awards}
        dueDate={dueDate}
        created={created}
        complete={complete}
        user={user}
      />
      <TaskWallTaskText task={task} />
      <TaskWallTaskInteraction
        likes={likes.likes}
        currentlyLiked={currentlyLiked}
        handleLike={handleLike}
        created={created}
        openComments={openComments}
        handleComments={setOpenComments}
        commentAmount={comments.length}
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
              <TaskWallTaskCommentList comments={comments} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.div>
  );
};

export default TaskWallTask;
