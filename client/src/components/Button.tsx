import { MotionProps, motion } from "framer-motion";
import { ForwardedRef, ReactElement, ReactNode, forwardRef } from "react";

interface ButtonPropsType extends MotionProps {
  label?: string;
  fontSize?: number;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
}

const Button = forwardRef(
  (
    {
      label = "",
      icon,
      fontSize = 12,
      className,
      children,
      onClick,
      ...props
    }: ButtonPropsType,
    ref?: ForwardedRef<HTMLButtonElement>
  ): ReactElement => {
    return (
      <motion.button
        ref={ref}
        className={`${className ?? ""} ${icon ? "flex items-baseline" : ""}`}
        onClick={onClick}
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
