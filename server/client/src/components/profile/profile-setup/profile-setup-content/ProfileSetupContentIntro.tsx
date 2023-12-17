import { useField } from "formik";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../../constants";
import TransformUnderline from "../../../__reusable/TransformUnderline";
import Faces from "../../../svg/Faces";

type ProfileSetupContentIntroPropsType = {
  firstCycle: string;
  mobile: boolean;
};

const ProfileSetupContentIntro = ({
  firstCycle,
  mobile,
}: ProfileSetupContentIntroPropsType): ReactElement => {
  return (
    <>
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
                duration: firstCycle === "initialAnimation" ? 1 : 0.6,
              },
              ease: "easeInOut",
            },
          }}
          exit={{
            opacity: 0,
            x: mobile ? 0 : -20,
            y: mobile ? -20 : 0,
            transition: { duration: 0.4 },
          }}
          style={{
            fontFamily: fonts.jura,
            textShadow: `1px 1px 10px black`,
            color: colors.whiteShades[1],
            opacity: 0,
          }}
          className="w-fit whitespace-nowrap text-lg sm:text-xl p-1 leading-none font-bold select-none tracking-tight flex gap-1 items-center relative z-10"
        >
          Let's get you setup...
        </motion.h3>
      </TransformUnderline>
      <motion.div
        key="div"
        initial={{ x: 20, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            delay: firstCycle === "initialAnimation" ? 2.5 : 0.8,
          },
        }}
        exit={{
          opacity: 0,
          x: mobile ? -20 : 0,
          y: mobile ? 0 : -20,
          transition: { duration: 0.4 },
        }}
      >
        <div className="flex justify-center items-center w-full">
          <Faces size={mobile ? 130 : 150} />
        </div>
      </motion.div>
    </>
  );
};

export default ProfileSetupContentIntro;
