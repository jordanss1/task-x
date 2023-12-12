import { motion } from "framer-motion";
import { CSSProperties, ReactElement, ReactNode } from "react";
import { colors } from "../constants";

type TransformBackgroundPropsType = {
  background?: CSSProperties["background"];
  mixBlendMode?: CSSProperties["mixBlendMode"];
  minHeight?: CSSProperties["minHeight"];
  children?: ReactNode;
};

const TransformBackground = ({
  background = "linear-gradient( 120deg, rgb(62, 62, 62), rgb(109, 109, 109), rgb(62, 62, 62) )",
  minHeight = "initial",
  mixBlendMode = "unset",
  children,
}: TransformBackgroundPropsType): ReactElement => {
  return (
    <motion.div
      style={{ minHeight, width: "fit-content" }}
      className="relative flex justify-center items-center overflow-hidden p-1 text-xl"
    >
      <motion.div
        style={{
          background,
          mixBlendMode,
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
        className="absolute -z-10 w-full rounded-none bottom-0 left-0"
      />
      {children}
    </motion.div>
  );
};

export default TransformBackground;
