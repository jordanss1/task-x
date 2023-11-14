import { useField } from "formik";
import { MotionProps, motion } from "framer-motion";
import { ReactElement } from "react";
import photos from "../../assets/profile-photos/profilePhotos";

interface ProfileChosenIconPropsType extends MotionProps {
  className: string;
  size?: number;
}

const ProfileChosenIcon = ({
  className,
  size,
  ...props
}: ProfileChosenIconPropsType): ReactElement => {
  const [field, meta, helpers] = useField("profilePhoto");
  size = size ?? 40;

  return (
    <motion.div className={className} {...props}>
      <img height={size} width={size} src={field.value} />
    </motion.div>
  );
};

export default ProfileChosenIcon;
