import { MotionProps, motion } from "framer-motion";
import { ReactElement } from "react";

interface LandingHeroCenterBackdropPropsType extends MotionProps {
  className: string;
}

const LandingHeroCenterBackdrop = ({
  className,
  layoutId,
  variants,
  ...props
}: LandingHeroCenterBackdropPropsType): ReactElement => {
  return (
    <motion.div
      layoutId={layoutId}
      variants={variants}
      className={className}
      {...props}
    />
  );
};

export default LandingHeroCenterBackdrop;
