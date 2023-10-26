import { MotionProps, motion } from "framer-motion";
import { ForwardedRef, ReactElement, ReactNode, forwardRef } from "react";

export type MotionButton = MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonPropsType = MotionButton & {
  label?: ReactNode;
  fontSize?: number;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

const Button = forwardRef(
  (
    {
      label = "",
      icon,
      fontSize = 12,
      className,
      children,
      ...props
    }: ButtonPropsType,
    ref?: ForwardedRef<HTMLButtonElement>
  ): ReactElement => {
    return (
      <motion.button
        ref={ref}
        className={`${className ?? ""} ${icon ? "flex items-baseline" : ""}`}
        {...props}
      >
        {typeof label === "string" ? (
          <span style={{ fontSize: `${fontSize}px` }}>{label}</span>
        ) : (
          label
        )}
        {icon}
        {children}
      </motion.button>
    );
  }
);

export default Button;
