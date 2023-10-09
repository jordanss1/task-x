import { MotionProps, motion } from "framer-motion";
import { ReactElement, ReactNode } from "react";

interface ButtonPropsType extends MotionProps {
  label: string;
  fontSize?: number;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
}

const Button = ({
  label,
  icon,
  fontSize,
  className,
  children,
  onClick,
  ...props
}: ButtonPropsType): ReactElement => {
  className = className ?? "";

  console.log(fontSize);

  return (
    <motion.button
      className={`${className} ${icon ? "flex items-baseline" : ""}`}
      onClick={onClick}
      {...props}
    >
      <span style={{ fontSize: `${fontSize ?? 12}px` }}>{label}</span>
      {icon}
      {children}
    </motion.button>
  );
};

export default Button;
