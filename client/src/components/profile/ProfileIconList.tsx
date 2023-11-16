import { useField } from "formik";
import { MotionProps, motion } from "framer-motion";
import { ReactElement } from "react";
import profilePhotos from "../../assets/profile-photos/profilePhotos";
import { colors } from "../../constants";
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
  const [field, meta, helpers] = useField("profilePhoto");

  return (
    <motion.div {...props} className={className}>
      {profilePhotos.map((profilePhoto) => {
        const chosenPhoto = profilePhoto === field.value;

        return (
          <ProfileIcon
            className="flex justify-center rounded-[30px] p-[3px] cursor-pointer"
            onClick={() => helpers.setValue(profilePhoto)}
            whileHover={{
              scale: chosenPhoto ? 1.1 : 1.2,
              boxShadow: chosenPhoto
                ? `3px 3px 10px ${colors.whiteShades[2]}, -3px -3px 10px ${colors.whiteShades[2]}, 5px 5px 10px black`
                : `0px 0px 0px ${colors.whiteShades[2]}, -0px -0px 0px ${colors.whiteShades[2]}, 5px 5px 10px black`,
              transition: { type: "spring", stiffness: 280, delay: 0.1 },
            }}
            style={{
              boxShadow: `0px 0px 0px ${colors.whiteShades[2]}, -0px -0px 0px ${colors.whiteShades[2]}, 0px 0px 0px black`,
            }}
            animate={{
              scale: chosenPhoto ? 1.1 : 1,
              boxShadow: chosenPhoto
                ? `3px 3px 10px ${colors.whiteShades[2]}, -3px -3px 10px ${colors.whiteShades[2]}, 5px 3px 10px black`
                : `0px 0px 0px ${colors.whiteShades[2]}, -0px -0px 0px ${colors.whiteShades[2]}, 0px 0px 0px black`,
              background: chosenPhoto ? "rgb(220,220,220)" : "none",
            }}
            size={iconSize}
            key={profilePhoto}
            img={profilePhoto}
          />
        );
      })}
    </motion.div>
  );
};

export default ProfileIconList;
