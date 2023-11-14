import { useField } from "formik";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../../constants";
import { useMediaQuery } from "../../../../hooks/MediaQueryHooks";
import TransformUnderline from "../../../TransformUnderline";
import Faces from "../../../svg/Faces";
import NeonClipboard from "../../../svg/NeonClipboard";
import ProfileChosenIcon from "../../ProfileChosenIcon";
import ProfileIconList from "../../ProfileIconList";
import ProfileSetupContentIntro from "./ProfileSetupContentIntro";
import ProfileSetupContentPicture from "./ProfileSetupContentPicture";

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
    }
  };

  const renderBackground = (
    <motion.div
      layoutId="background"
      custom={{ mobile, initial: firstCycle === "initialAnimation" }}
      variants={backgroundVariants}
      style={{
        background:
          "linear-gradient(110deg, rgb(0,0,255), rgb(153, 31, 255,.8)",
        borderRadius: "100px 200px 200px 100px",
        height: contentCycle === "intro" ? "285px" : "350px",
        maxWidth: maxWidth(),
      }}
      animate={contentCycle}
      transition={{
        layout: { duration: 1, type: "tween" },
      }}
      className="absolute w-full h-full m-auto inset-0 mix-blend-difference -z-[10]"
    />
  );

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="container1"
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
            style={{
              maxWidth: maxWidth(),
              gridTemplateColumns: "100px 1fr",
            }}
            className="relative p-7 w-full h-full justify-center items-center gap-3 grid"
          >
            {renderBackground}
            <ProfileSetupContentPicture mobile={mobile} />
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.8 } }}
      className="isolate flex justify-center items-center relative w-full min-h-[383px] h-full"
    >
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </motion.div>
  );
};

export default ProfileSetupContent;
