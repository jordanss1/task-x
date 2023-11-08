import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import TransformUnderline from "../../TransformUnderline";
import ProfileSetupBackground from "./ProfileSetupBackground";

const ProfileSetupContent = ({ step }: { step: number }): ReactElement => {
  const renderInstructions = () => {
    switch (step) {
      case 0:
        return (
          <TransformUnderline
            backgroundColors={[
              "linear-gradient(90deg, rgb(153, 31, 255, 0), rgb(153, 31, 255) 0% 100%, rgb(202, 255, 159, 0)),",
              "linear-gradient(90deg, rgb(202, 255, 159), rgb(153, 31, 255) 20% 80%, rgb(202, 255, 159))",
            ]}
            addedDelay={1}
          >
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
                textShadow: `1px 1px 10px ${colors.purple}`,
              }}
              className="w-fit text-slate-500 text-xl p-1 leading-none font-bold select-none tracking-tight flex gap-1 items-center relative z-10"
            >
              Let's get you setup...
            </motion.h3>
          </TransformUnderline>
        );
    }
  };

  const renderSetup = () => {
    switch (step) {
      case 0:
        return <></>;
    }
  };

  return (
    <motion.div className="content_wrapper overflow-hidden relative w-full pb-5 h-full flex justify-center items-center">
      <ProfileSetupBackground />
      {renderInstructions()}
      <div className="content_setup">{renderSetup()}</div>
    </motion.div>
  );
};

export default ProfileSetupContent;
