import { AnimatePresence, Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors } from "../../../../constants";
import { useMediaQuery } from "../../../../hooks/MediaQueryHooks";
import ProfilePicture from "../../ProfilePicture";
import ProfileUsername from "../../ProfileUsername";
import ProfileSetupContentIntro from "./ProfileSetupContentIntro";

type ProfileSetupContentPropsType = {
  step: number;
  firstCycle: string;
  contentCycle: string;
};

const backgroundVariants: Variants = {
  intro: ({ mobile, initial }) => ({
    borderRadius: mobile
      ? "100px 100px 100px 100px"
      : "100px 200px 200px 100px",
    height: "285px",
    transition: {
      type: "tween",
    },
  }),
  userPicture: ({ mobile }) => ({
    opacity: 1,
    borderRadius: "100px 100px 100px 100px",
    height: "386px",
    transition: {
      type: "tween",
    },
  }),
  userName: ({ mobile }) => ({
    opacity: 1,
    borderRadius: "50px 50px 50px 50px",
    height: "156px",
    transition: {
      type: "tween",
    },
  }),
};

const ProfileSetupContent = ({
  step,
  firstCycle,
  contentCycle,
}: ProfileSetupContentPropsType): ReactElement => {
  const mobile = useMediaQuery(640);

  const maxWidth = () => {
    if (contentCycle === "intro") {
      return mobile ? "350px" : "491px";
    } else if (contentCycle === "userPicture") {
      return "550px";
    } else {
      return "450px";
    }
  };

  const renderBackground = (
    <motion.div
      layoutDependency={step}
      layoutId="background3"
      custom={{ mobile, initial: firstCycle === "initialAnimation" }}
      variants={backgroundVariants}
      style={{
        background: colors.purpleGradients[0],
        borderRadius: "100px 100px 100px 100px",
        height: contentCycle === "intro" ? "285px" : "350px",
        maxWidth: maxWidth(),
      }}
      animate={contentCycle}
      transition={{
        borderRadius: { duration: 0.1, type: "tween" },
        layout: {
          duration: 0.3,
          type: "spring",
        },
      }}
      className="absolute w-full h-full m-auto inset-0 mix-blend-difference -z-10"
    />
  );

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            layout
            key="container1"
            style={{
              maxWidth: maxWidth(),
            }}
            className="relative p-5 w-full h-full flex sm:gap-0 gap-3 sm:flex-row flex-col justify-center items-center"
          >
            {renderBackground}
            <ProfileSetupContentIntro firstCycle={firstCycle} mobile={mobile} />
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="container2"
            layout
            style={{
              maxWidth: maxWidth(),
            }}
            className="profile_setup_picture relative p-7 w-full h-full justify-center items-center gap-3"
          >
            {renderBackground}
            <ProfilePicture mobile={mobile} />
          </motion.div>
        );
      default:
        return (
          <motion.div
            layout
            style={{
              maxWidth: maxWidth(),
            }}
            key="container3"
            className="relative w-full h-full flex sm:flex-row flex-col gap-5 justify-center items-center"
          >
            {renderBackground}
            <ProfileUsername mobile={mobile} />
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.8 } }}
      className="profile_setup_content isolate flex justify-center items-center relative w-full min-h-[383px] h-full"
    >
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </motion.div>
  );
};

export default ProfileSetupContent;
