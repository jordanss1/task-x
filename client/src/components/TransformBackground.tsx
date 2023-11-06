import { motion } from "framer-motion";
import { CSSProperties, ReactElement, ReactNode } from "react";
import { colors } from "../constants";

type TransformBackgroundPropsType = {
  background?: CSSProperties["background"];
  children?: ReactNode;
};

const TransformBackground = ({
  background = colors.blackGradient[1],
  children,
}: TransformBackgroundPropsType): ReactElement => {
  return (
    <motion.div className="relative overflow-hidden w-fit p-1 text-xl">
      <motion.div
        style={{
          background,
          height: "5%",
          x: "100%",
        }}
        animate={{
          height: ["3%", "100%"],
          x: ["100%", "0%"],
          borderRadius: ["0px", "10px"],
          transition: {
            borderRadius: { delay: 1, duration: 1 },
            height: { delay: 1, duration: 1 },
            x: { duration: 1 },
            duration: 1.5,
            ease: "easeInOut",
          },
        }}
        className="absolute w-full rounded-none bottom-0 left-0"
      />
      {children}
    </motion.div>
  );
};

export default TransformBackground;
