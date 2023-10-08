import { MotionProps, motion } from "framer-motion";
import { ReactElement, ReactNode } from "react";

interface ButtonPropsType extends MotionProps {
  label: string;
  icon?: ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
}

const Button = ({
  label,
  icon,
  className,
  onClick,
  ...props
}: ButtonPropsType): ReactElement => {
  className = className ?? "";

  return (
    <motion.button
      className={`${className} ${icon ? "flex" : ""}`}
      onClick={onClick}
      {...props}
    >
      <span>{label}</span>
      {icon}
    </motion.button>
  );
};

export default Button;
