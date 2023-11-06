import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import TransformUnderline from "../../TransformUnderline";

const ProfileSetupContent = ({ step }: { step: number }): ReactElement => {
  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <TransformUnderline addedDelay={1}>
            <motion.h3
              animate={{
                opacity: [0, 1],
                transition: {
                  opacity: { delay: 2.2, duration: 1 },
                  ease: "easeInOut",
                },
              }}
              style={{
                fontFamily: fonts.jura,
                color: colors.whiteShades[0],
              }}
              className="w-fit text-2xl p-1 leading-none font-bold select-none tracking-tighter flex gap-1 items-center relative mix-blend-exclusion z-10"
            >
              Let's get you setup...
            </motion.h3>
          </TransformUnderline>
        );
    }
  };

  return (
    <div className="w-full flex justify-center min-h-[150px]">
      {renderContent()}
    </div>
  );
};

export default ProfileSetupContent;
