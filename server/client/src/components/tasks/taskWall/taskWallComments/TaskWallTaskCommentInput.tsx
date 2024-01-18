import { FieldProps, FormikProps, useField } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../../constants";
import { CommentType } from "../../../../types";
import Button from "../../../__reusable/Button";
import SmallIcon from "../../../__reusable/SmallIcon";
import Spinner from "../../../__reusable/Spinner";
import { CommentSchemaType } from "./TaskWallTaskCommentList";

interface TaskWallTaskCommentInputPropsType extends FormikProps<CommentSchemaType> {}

const TaskWallTaskCommentInput = ({
  ...props
}: TaskWallTaskCommentInputPropsType): ReactElement => {
  const [field, meta] = useField("comment");

  const error = meta.touched && meta.error;

  const renderIcon = props.isSubmitting ? (
    <Spinner color={colors.purple} position="initial" size="small" />
  ) : (
    <SmallIcon
      style={{
        color: field.value ? "white" : "grey",
      }}
      size={14}
      icon="fa-solid fa-comments"
    />
  );

  return (
    <div className="bg-white isolate relative rounded-2xl h-9 w-full flex items-center gap-2">
      <AnimatePresence mode="wait">
        {error && (
          <motion.span
            initial={{ x: 15, y: -35, opacity: 0 }}
            animate={{ x: 30, opacity: 1 }}
            exit={{
              x: 15,
              opacity: 0,
              transition: { type: "tween", duration: 0.2 },
            }}
            style={{
              background: colors.whiteShades[0],
              outline: "1px solid rgb(255, 0, 0)",
            }}
            className="fixed px-2 rounded-xl -left-1 text-xs text-[rgb(40,40,40)]"
          >
            {meta.error}
          </motion.span>
        )}
      </AnimatePresence>
      <input
        {...field}
        style={{ fontFamily: fonts.jura }}
        className="rounded-2xl ps-2 text-sm outline-none w-full h-full"
      />
      <Button
        type="submit"
        onClick={() => props.submitForm()}
        style={{ alignItems: "center", borderRadius: "0px 16px 16px 0" }}
        disabled={!field.value || Boolean(meta.error) || props.isSubmitting}
        className="rounded-2xl justify-center outline outline-1 outline-slate-100 disabled:bg-slate-300 bg-[#991ff1] h-full w-10"
        icon={renderIcon}
      />
    </div>
  );
};

export default TaskWallTaskCommentInput;
