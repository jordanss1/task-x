import { MotionProps, MotionStyle, motion } from "framer-motion";
import { ReactElement } from "react";

interface ButtonPropsType extends MotionProps {
  label: string;
  onClick?: (e?: React.MouseEvent) => void;
}

const Button = ({
  label,
  onClick,

  ...props
}: ButtonPropsType): ReactElement => {
  return (
    <motion.button className="basic_button p-2" {...props} onClick={onClick}>
      {label}
    </motion.button>
  );
};

export default Button;
