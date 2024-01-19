import { FormikConfig, useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../../constants";
import Button from "../../../__reusable/Button";
import Spinner from "../../../__reusable/Spinner";
import { CommentSchemaType, commentSchema } from "./TaskWallTaskCommentList";

type TaskWallTaskCommentEditPropsType = {
  handleEdit: (active: boolean, comment?: string) => Promise<void>;
  comment: string;
};

const TaskWallTaskCommentEdit = ({
  handleEdit,
  comment,
}: TaskWallTaskCommentEditPropsType): ReactElement => {
  const handleSubmit: FormikConfig<
    Pick<CommentSchemaType, "comment">
  >["onSubmit"] = async ({ comment }) => {
    await handleEdit(false, comment);
  };

  const {
    getFieldMeta,
    getFieldProps,
    resetForm,
    submitForm,
    isSubmitting,
    initialValues,
    dirty,
  } = useFormik<Pick<CommentSchemaType, "comment">>({
    validateOnBlur: false,
    initialValues: { comment },
    validationSchema: commentSchema.pick(["comment"]),
    onSubmit: async (values, actions) => await handleSubmit(values, actions),
  });

  const { error, touched } = getFieldMeta("comment");

  const buttonLabels: ("Cancel" | "Submit")[] = ["Cancel", "Submit"];

  const buttonStyle = {
    width: "100%",
    color: colors.whiteShades[0],
    fontFamily: fonts.exo,
  };

  return (
    <div className="flex flex-col pt-3 gap-3 w-full px-6">
      <AnimatePresence mode="wait">
        {error && touched && (
          <motion.span
            initial={{ x: 25, y: -22, opacity: 0 }}
            animate={{ x: 40, opacity: 1 }}
            exit={{
              x: 30,
              opacity: 0,
              transition: { type: "tween", duration: 0.2 },
            }}
            style={{
              background: colors.whiteShades[0],
              outline: "1px solid rgb(255, 0, 0)",
            }}
            className="fixed px-2 rounded-md -left-1 text-xs text-[rgb(40,40,40)]"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
      <div className="font-light text-sm sm:text-[16px]">
        <textarea
          {...getFieldProps("comment")}
          className="w-full rounded-md resize-none p-1 min-h-[65px]"
        />
      </div>
      <div className="flex justify-end pb-3 gap-2">
        {buttonLabels.map((label: "Cancel" | "Submit") => {
          const cancel = label === "Cancel";

          const handleClick = cancel
            ? () => {
                handleEdit(false);
                resetForm();
              }
            : () => submitForm();

          const disabled = cancel
            ? isSubmitting
            : isSubmitting || !dirty || Boolean(error);

          return (
            <Button
              key={label}
              disabled={disabled}
              onClick={handleClick}
              className="max-w-[80px] bg-[rgb(153,31,255)] disabled:bg-slate-400 h-8 rounded-xl flex items-center justify-center"
              label={
                label === "Submit" && isSubmitting ? (
                  <Spinner position="initial" />
                ) : (
                  label
                )
              }
              style={buttonStyle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskWallTaskCommentEdit;
