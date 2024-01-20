import { AnimatePresence, Variants, motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMeasure from "react-use-measure";
import { AppThunkDispatch } from "../../../../app/store";
import { fonts } from "../../../../constants";
import { authSelector } from "../../../../features/auth/authSlice";
import {
  deleteComment,
  editComment,
  sendCommentLike,
  setTaskWallPrompt,
} from "../../../../features/taskWall/taskWallSlice";
import { CommentType, TaskWallTaskType } from "../../../../types";
import LikeButton from "../../../__reusable/LikeButton";
import Popup, { PopupPropsType } from "../../../__reusable/Popup";
import TaskWallCommentUser from "./TaskWallCommentUser";
import TaskWallTaskCommentEdit from "./TaskWallTaskCommentEdit";

type TaskWallTaskCommentPropsType = {
  commentItem: CommentType;
  taskId: TaskWallTaskType["taskId"];
};

const commentVariants: Variants = {
  initial: { y: -60, opacity: 0, scale: 0.7 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, type: "tween", ease: "circOut" },
  },
  exit: {
    y: -20,
    opacity: 0,
  },
};

const TaskWallTaskComment = ({
  commentItem,
  taskId,
}: TaskWallTaskCommentPropsType): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const auth = useSelector(authSelector);
  const [fetching, setFetching] = useState(false);
  const [formActive, setFormActive] = useState(false);

  const [ref, { height }] = useMeasure();

  const { likes, comment, user, _id, created } = commentItem;

  const liked = likes.users.some(({ userName }) => {
    if (auth.user) {
      return userName === auth.user.profile?.userName;
    }
  });

  let currentUserComment = false;

  if (auth.user) {
    currentUserComment = auth.user._user === user._user;
  }

  const handleLike = async () => {
    if (!fetching) {
      setFetching(true);
      await dispatch(sendCommentLike({ _id, liked, taskId }));
      setFetching(false);
    }
  };

  const handleEdit = async (active: boolean, comment?: string) => {
    if (active) {
      setFormActive(active);
      return;
    }

    if (comment) {
      await dispatch(editComment({ _id, comment, taskId }));
    }

    setFormActive(active);
  };

  const handleDelete = async () => {
    dispatch(
      setTaskWallPrompt({
        message: "Are you sure you want to delete your comment?",
        onDeny: () => dispatch(setTaskWallPrompt(undefined)),
        onAccept: async () => {
          await dispatch(deleteComment({ _id, taskId }));
          dispatch(setTaskWallPrompt(undefined));
        },
      })
    );
  };

  const renderComment = (
    <motion.div
      key={`comment-${taskId}`}
      className="md:max-w-[93%] sm:max-w-[91%] max-w-[92%] w-full ms-auto"
      ref={ref}
    >
      {!formActive || !currentUserComment ? (
        <span
          className="font-light text-sm sm:text-[16px]  pe-3"
          style={{ fontFamily: fonts.jura }}
        >
          {comment}
        </span>
      ) : (
        <TaskWallTaskCommentEdit comment={comment} handleEdit={handleEdit} />
      )}
    </motion.div>
  );

  return (
    <motion.div
      variants={commentVariants}
      className="flex flex-col gap-1 justify-center"
    >
      <TaskWallCommentUser
        currentUserComment={currentUserComment}
        created={created}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        formActive={formActive}
        user={user}
      />
      <motion.div
        animate={{
          height,
          transition: {
            duration: 0.4,
            type: "tween",
            ease: "easeOut",
          },
        }}
        className="min-h-[30px] overflow-hidden"
      >
        {renderComment}
      </motion.div>
      <div className="w-full relative bottom-1 flex justify-end px-6">
        {!formActive && (
          <LikeButton
            size={15}
            fetching={fetching}
            likes={likes.likes}
            liked={liked}
            onClick={async () => await handleLike()}
          />
        )}
      </div>
    </motion.div>
  );
};

export default TaskWallTaskComment;
