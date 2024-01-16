import { Variants, motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../../../app/store";
import { fonts } from "../../../../constants";
import { authSelector } from "../../../../features/auth/authSlice";
import { sendCommentLike } from "../../../../features/taskWall/taskWallSlice";
import { CommentType, TaskWallTaskType } from "../../../../types";
import LikeButton from "../../../__reusable/LikeButton";
import TaskWallCommentUser from "./TaskWallCommentUser";

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

  const { likes, comment, user } = commentItem;

  const liked = likes.users.some(({ userName }) => {
    if (auth.user) {
      return userName === auth.user.profile?.userName;
    }
  });

  const handleLike = async () => {
    if (!fetching) {
      setFetching(true);
      await dispatch(
        sendCommentLike({ taskId, liked, previousLikes: likes.likes })
      );
      setFetching(false);
    }
  };

  return (
    <motion.div
      variants={commentVariants}
      className="flex flex-col gap-1 justify-center"
    >
      <TaskWallCommentUser user={user.profile} />
      <span
        className="font-light text-sm sm:text-[16px] ps-9 sm:ps-12 pe-3"
        style={{ fontFamily: fonts.jura }}
      >
        {comment}
      </span>
      <div className="w-full relative bottom-1 flex justify-end px-6">
        <LikeButton
          size={15}
          fetching={fetching}
          likes={likes.likes}
          liked={liked}
          onClick={async () => await handleLike()}
        />
      </div>
    </motion.div>
  );
};

export default TaskWallTaskComment;
