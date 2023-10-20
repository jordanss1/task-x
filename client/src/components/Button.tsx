import { MotionProps, motion } from "framer-motion";
import { ForwardedRef, ReactElement, ReactNode, forwardRef } from "react";

type MotionButton = MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonPropsType = MotionButton & {
  label?: string;
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
        {label && <span style={{ fontSize: `${fontSize}px` }}>{label}</span>}
        {icon}
        {children}
      </motion.button>
    );
  }
);

export default Button;
