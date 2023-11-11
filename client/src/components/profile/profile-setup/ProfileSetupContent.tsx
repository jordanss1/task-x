import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import TransformUnderline from "../../TransformUnderline";
import Faces from "../../svg/Faces";
import NeonClipboard from "../../svg/NeonClipboard";
import ProfileChosenIcon from "../ProfileChosenIcon";
import ProfileIconList from "../ProfileIconList";
import ProfileSetupBackground from "./ProfileSetupBackground";

type ProfileSetupContentPropsType = {
  step: number;
  firstCycle: string;
};

const ProfileSetupContent = ({
  step,
  firstCycle,
}: ProfileSetupContentPropsType): ReactElement => {
  const renderBackground = (
    <motion.div
      layoutId="background"
      layout
      style={{
        borderRadius: "100px 200px 200px 100px / 100px 200px 200px 100px",
      }}
      animate={{
        background:
          "linear-gradient(110deg,   rgb(0,0,255), rgb(153, 31, 255,.8)",
        transition: {
          background: {
            delay: firstCycle === "initialAnimation" ? 2.5 : 0.6,
            duration: 0.6,
          },
        },
      }}
      transition={{ layout: { duration: 0.6, delay: 0.3 } }}
      className="absolute h-[120%] w-[110%] -top-6 sm:h-[150%] sm:w-[120%] sm:-top-11 sm:-left-10 inset-0 sm:inset-auto mix-blend-difference -z-[10]"
    />
  );

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="container"
            exit={{ position: "absolute" }}
            className="relative p-5 inset-0  w-fit flex sm:gap-0 gap-3 sm:flex-row flex-col justify-center items-center"
          >
            {renderBackground}
            <TransformUnderline
              backgroundColors={[
                "linear-gradient(90deg, rgb(153, 31, 255, 0), rgb(153, 31, 255,0) 0% 100%, rgb(202, 255, 159, 0)),",
                "linear-gradient(90deg, rgb(153, 31, 255, 0), rgb(153, 31, 255) 0% 100%, rgb(202, 255, 159, 0)),",
                "linear-gradient(90deg, rgb(202, 255, 159,0), rgb(153, 31, 255) 20% 80%, rgb(202, 255, 159,0))",
              ]}
              addedDelay={firstCycle === "initialAnimation" ? 1.5 : 0}
            >
              <motion.h3
                key="head"
                animate={{
                  opacity: [0, 1],
                  transition: {
                    opacity: {
                      delay: firstCycle === "initialAnimation" ? 2.5 : 1,
                      duration: 1,
                    },
                    ease: "easeInOut",
                  },
                }}
                exit={{ opacity: 0, x: -30, transition: { duration: 0.8 } }}
                style={{
                  fontFamily: fonts.jura,
                  textShadow: `1px 1px 10px black`,
                  color: colors.whiteShades[1],
                }}
                className="w-fit whitespace-nowrap text-xl p-1 leading-none font-bold select-none tracking-tight flex gap-1 items-center relative z-10"
              >
                Let's get you setup...
              </motion.h3>
            </TransformUnderline>
            <motion.div
              key="div"
              initial={{ x: 30, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  delay: firstCycle === "initialAnimation" ? 2.5 : 1,
                },
              }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.8 } }}
              className="h-full"
            >
              <div className="flex justify-center items-center w-full h-full">
                <Faces size={150} />
              </div>
            </motion.div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div className="relative">
            {renderBackground}
            <ProfileChosenIcon />
            <ProfileIconList />
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      style={{
        opacity: 0,
        borderRadius: "100px 100px 100px 100px / 100px 100px 100px 100px",
        outlineStyle: "groove",
        boxShadow:
          "inset 1px 1px 30px rebeccapurple, inset -1px -1px 30px rebeccapurple",
        backgroundImage:
          "radial-gradient(circle, rgb(0, 0, 0) 2rem, transparent 1rem),linear-gradient(rgb(153, 31, 255) 0.5rem, transparent 0.5rem),linear-gradient(90deg, rgb(0, 0, 0) 0.5rem, transparent 1.5rem)",
      }}
      animate={{
        opacity: 1,
        backgroundImage:
          "radial-gradient(circle, rgb(0, 0, 0) 1rem, transparent 1rem),linear-gradient(rgb(153, 31, 255) 0.5rem, transparent 0.5rem),linear-gradient(90deg, rgb(0, 0, 0) 0.5rem, transparent 1.5rem)",
        transition: {
          opacity: { delay: 1.5 },
          backgroundImage: { delay: 1, duration: 2 },
        },
      }}
      className="content_wrapper isolate flex justify-center items-center max-h-[521px] sm:min-h-[385px] sm:max-h-[400px] max-w-[902px] outline-offset-4 overflow-hidden relative w-full h-full"
    >
      <AnimatePresence mode="sync">{renderContent()}</AnimatePresence>
    </motion.div>
  );
};

export default ProfileSetupContent;
