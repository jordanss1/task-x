import { MotionProps, motion } from "framer-motion";
import { ReactElement } from "react";

interface SmallIconPropsType extends MotionProps {
  icon: string;
  className?: string;
  size?: number;
}

const SmallIcon = ({
  icon,
  className,
  size,
  style,
  ...props
}: SmallIconPropsType): ReactElement => {
  className = `${icon} ${className ?? ""}`;

  return (
    <motion.i
      {...props}
      style={{ fontSize: `${size ?? 12}px`, ...style }}
      className={className}
    />
  );
};

export default SmallIcon;
