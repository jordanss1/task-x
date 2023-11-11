import { AnimatePresence, Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import TransformBackground from "../../TransformBackground";
import HeaderLogoText from "../../header/HeaderLogoText";

const firstHeader: Variants = {
  initialAnimation: {
    opacity: [0, 1],
    transition: {
      opacity: { delay: 1.2, duration: 1 },
    },
  },
  backAnimation: {
    x: ["-100%", "0%"],
    transition: {
      x: { delay: 0.7, duration: 1 },
      ease: "easeOut",
      type: "tween",
    },
  },
  exit: {
    position: "absolute",
    x: "-100%",

    transition: { duration: 1, ease: "easeInOut", type: "tween" },
  },
};

type ProfileSetupHeaderPropsType = {
  step: number;
  firstCycle: string;
};

const ProfileSetupHeader = ({
  step,
  firstCycle,
}: ProfileSetupHeaderPropsType): ReactElement => {
  const renderHeader = () => {
    switch (step) {
      case 0:
        return (
          <motion.h2
            key="first"
            variants={firstHeader}
            animate={firstCycle}
            exit="exit"
            style={{
              fontFamily: fonts.jura,
              color: colors.whiteShades[0],
            }}
            className="w-fit whitespace-nowrap inset-0 text-2xl p-2 leading-none font-bold select-none tracking-tighter flex gap-1 items-center relative z-10"
          >
            Welcome to <HeaderLogoText fontSize={24} />
          </motion.h2>
        );
      default:
        return (
          <motion.h2
            key="second"
            initial={{ x: "100%" }}
            animate={{
              x: "0%",
              transition: {
                delay: 0.7,
                duration: 1,
                ease: "easeOut",
                type: "tween",
              },
            }}
            exit={{
              x: "150%",
              position: "absolute",
              transition: { duration: 1, ease: "easeInOut", type: "tween" },
            }}
            style={{
              letterSpacing: "-1px",
              fontFamily: fonts.jura,
              color: colors.whiteShades[0],
            }}
            className="text-2xl inset-0 p-2 w-fit font-extrabold relative z-10"
          >
            Profile setup
          </motion.h2>
        );
    }
  };

  return (
    <div className="w-full flex justify-center">
      <TransformBackground
        background={colors.hoveredButtonGradient}
        minHeight="56px"
        mixBlendMode="multiply"
      >
        <AnimatePresence mode="sync">{renderHeader()}</AnimatePresence>
      </TransformBackground>
    </div>
  );
};

export default ProfileSetupHeader;
