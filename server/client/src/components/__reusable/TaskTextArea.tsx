import { useField } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { ForwardedRef, ReactElement, forwardRef } from "react";
import { colors } from "../../constants";

interface TaskTextAreaPropTypes {
  name: string;
  className: string;
  editing?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const TaskTextArea = forwardRef(
  (
    {
      className,
      style,
      disabled = false,
      editing = true,
      ...props
    }: TaskTextAreaPropTypes,
    ref?: ForwardedRef<HTMLTextAreaElement>
  ): ReactElement => {
    const [field, meta] = useField(props);

    const error = meta.touched && meta.error;

    return (
      <>
        <AnimatePresence mode="wait">
          {error && editing && (
            <motion.span
              initial={{ y: 0 }}
              animate={{ y: -20 }}
              exit={{ y: 0, transition: { type: "tween", duration: 0.2 } }}
              style={{
                background: colors.whiteShades[1],
                outline: "1px solid rgb(255, 0, 0)",
              }}
              className="absolute rounded-t-xl p-1 px-2 text-xs top-0 right-1 text-[rgb(40,40,40)]"
            >
              {meta.error}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.textarea
          ref={ref}
          animate={{
            outline:
              error && editing
                ? "2px solid rgb(255, 0, 0)"
                : "2px solid rgb(180,180,180)",
          }}
          style={style}
          className={className}
          disabled={disabled}
          {...field}
        />
      </>
    );
  }
);

export default TaskTextArea;
