import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import TransformBackground from "../../TransformBackground";
import HeaderLogoText from "../../header/HeaderLogoText";

const ProfileSetupHeader = ({ step }: { step: number }): ReactElement => {
  const renderHeader = () => {
    switch (step) {
      case 0:
        return (
          <TransformBackground>
            <motion.h2
              animate={{
                opacity: [0, 1],
                transition: {
                  opacity: { delay: 1.2, duration: 1 },
                  ease: "easeInOut",
                },
              }}
              style={{
                fontFamily: fonts.jura,
                color: colors.whiteShades[0],
              }}
              className="w-fit text-3xl p-2 leading-none font-bold select-none tracking-tighter flex gap-1 items-center relative mix-blend-exclusion z-10"
            >
              Welcome to <HeaderLogoText fontSize={30} />
            </motion.h2>
          </TransformBackground>
        );
      case 1:
        return (
          <TransformBackground>
            <motion.h2
              layout
              animate={{
                opacity: [0, 1],
                transition: {
                  opacity: { delay: 1, duration: 1 },
                  letterSpacing: { delay: 1, duration: 1 },
                  ease: "easeInOut",
                },
              }}
              style={{ letterSpacing: "-1px", fontFamily: fonts.jura }}
              className="text-white w-fit font-extrabold relative mix-blend-exclusion z-10"
            >
              Profile setup
            </motion.h2>
          </TransformBackground>
        );
    }
  };

  return <div className="w-full flex justify-center">{renderHeader()}</div>;
};

export default ProfileSetupHeader;
