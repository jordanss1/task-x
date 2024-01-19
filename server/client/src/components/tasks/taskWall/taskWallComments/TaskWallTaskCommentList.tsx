import { Formik, FormikConfig } from "formik";
import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { AppThunkDispatch } from "../../../../app/store";
import { submitComment } from "../../../../features/taskWall/taskWallSlice";
import { CommentType, TaskWallTaskType } from "../../../../types";
import TaskWallTaskComment from "./TaskWallTaskComment";
import TaskWallTaskCommentInput from "./TaskWallTaskCommentInput";

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

export const commentSchema = yup.object().shape({
  comment: yup
    .string()
    .min(1, "Comment cannot be empty")
    .max(80, "Must not exceed 80 characters")
    .required("Comment cannot be empty"),
  taskId: yup.string().required(),
});

export type CommentSchemaType = yup.InferType<typeof commentSchema>;

const TaskWallTaskCommentList = ({
  comments,
  taskId,
}: TaskWallTaskCommentListPropsType): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const handleSubmit: FormikConfig<CommentSchemaType>["onSubmit"] = async (
    values,
    actions
  ) => {
    await dispatch(submitComment(values));
    actions.resetForm({ values });
  };

  return (
    <>
      <Formik<CommentSchemaType>
        onSubmit={handleSubmit}
        initialValues={{ comment: "", taskId }}
        validateOnBlur={false}
        validationSchema={commentSchema}
      >
        {(props) => {
          return (
            <motion.div
              variants={inputVariants}
              className="py-2 px-1 justify-center items-center w-full h-14"
            >
              <TaskWallTaskCommentInput {...props} />
            </motion.div>
          );
        }}
      </Formik>
      <motion.div
        variants={listVariants}
        className="flex flex-col pb-1 gap-2 px-1"
      >
        {comments.map((comment, i) => (
          <TaskWallTaskComment key={i} taskId={taskId} commentItem={comment} />
        ))}
      </motion.div>
    </>
  );
};

export default TaskWallTaskCommentList;
