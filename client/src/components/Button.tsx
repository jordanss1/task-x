import { MotionProps, motion } from "framer-motion";
import { ReactElement, ReactNode } from "react";

interface ButtonPropsType extends MotionProps {
  children?: ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
}

const Button = ({
  children,
  className,
  onClick,
  ...props
}: ButtonPropsType): ReactElement => {
  className = className ?? "";

  return (
    <motion.button className={className} {...props} onClick={onClick}>
      {children}
    </motion.button>
  );
};

export default Button;
