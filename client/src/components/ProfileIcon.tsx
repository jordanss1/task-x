import { MotionProps, motion } from "framer-motion";
import { ReactElement } from "react";

interface ProfileIconPropsType extends MotionProps {
  img: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const ProfileIcon = ({
  img,
  onClick,
  className,
  size,
  ...props
}: ProfileIconPropsType): ReactElement => {
  const imgSize = `${size ?? 50}px`;

  return (
    <motion.div className={className} onClick={onClick} {...props}>
      <img width={imgSize} height={imgSize} src={img} />
    </motion.div>
  );
};

export default ProfileIcon;
