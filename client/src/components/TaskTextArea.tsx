import { useField } from "formik";
import { ForwardedRef, ReactElement, forwardRef } from "react";
import { fonts } from "../constants";

interface TaskTextAreaPropTypes {
  name: string;
  className: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const TaskTextArea = forwardRef(
  (
    { className, style, disabled = false, ...props }: TaskTextAreaPropTypes,
    ref?: ForwardedRef<HTMLTextAreaElement>
  ): ReactElement => {
    const [field, meta] = useField(props);

    return (
      <textarea
        ref={ref}
        style={style}
        className={className}
        disabled={disabled}
        {...field}
      />
    );
  }
);

export default TaskTextArea;
