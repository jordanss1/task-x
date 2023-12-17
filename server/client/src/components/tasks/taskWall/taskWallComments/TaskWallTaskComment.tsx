import { Variants, motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { fonts } from "../../../../constants";
import { CommentType } from "../../../../types";
import LikeButton from "../../../__reusable/LikeButton";
import TaskWallCommentUser from "./TaskWallCommentUser";

type TaskWallTaskCommentPropsType = {
  comment: CommentType;
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
  comment,
}: TaskWallTaskCommentPropsType): ReactElement => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      variants={commentVariants}
      className="flex flex-col gap-1 justify-center"
    >
      <TaskWallCommentUser user={comment.user} />
      <span
        className="font-light text-sm sm:text-[16px] ps-9 sm:ps-12 pe-3"
        style={{ fontFamily: fonts.jura }}
      >
        {comment.comment}
      </span>
      <div className="w-full relative bottom-1 flex justify-end px-6">
        <LikeButton
          size={15}
          likes={comment.likes}
          liked={liked}
          onClick={() => setLiked((prev) => !prev)}
        />
      </div>
    </motion.div>
  );
};

export default TaskWallTaskComment;
