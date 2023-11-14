import { MotionProps, motion } from "framer-motion";
import { ReactElement } from "react";

interface ProfileIconPropsType extends MotionProps {
  img: string;
  size?: number;
  onClick?: () => void;
}

const ProfileIcon = ({
  img,
  onClick,
  size,
  ...props
}: ProfileIconPropsType): ReactElement => {
  const imgSize = `${size ?? 50}px`;

  console.log(img);

  return (
    <motion.div {...props}>
      <img width={imgSize} height={imgSize} src={img} />
    </motion.div>
  );
};

export default ProfileIcon;
