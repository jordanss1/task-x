import { MotionProps, motion } from "framer-motion";
import { ReactElement } from "react";
import profilePhotos from "../../assets/profile-photos/profilePhotos";
import ProfileIcon from "../ProfileIcon";

interface ProfileIconListPropsType extends MotionProps {
  iconSize: number;
  className?: string;
}

const ProfileIconList = ({
  iconSize,
  className,
  ...props
}: ProfileIconListPropsType): ReactElement => {
  return (
    <motion.div {...props} className={className}>
      {profilePhotos.map((profilePhoto) => (
        <ProfileIcon size={iconSize} key={profilePhoto} img={profilePhoto} />
      ))}
    </motion.div>
  );
};

export default ProfileIconList;
