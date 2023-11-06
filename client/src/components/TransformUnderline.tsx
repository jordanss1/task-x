import { motion } from "framer-motion";
import { CSSProperties, ReactElement, ReactNode } from "react";
import { colors } from "../constants";

type TransformUnderlinePropsType = {
  background?: CSSProperties["background"];
  children?: ReactNode;
  addedDelay?: number;
};

const TransformUnderline = ({
  background = colors.purple,
  addedDelay = 0,
  children,
}: TransformUnderlinePropsType): ReactElement => {
  return (
    <motion.div className="relative h-fit overflow-hidden w-fit p-1 text-xl">
      <motion.div
        style={{
          background,
          height: "5%",
          x: "100%",
        }}
        animate={{
          height: ["3%", "100%", "3%"],
          top: "97%",
          x: ["100%", "0%"],
          borderRadius: ["0px", "10px", "0px"],
          transition: {
            x: { delay: 0 + addedDelay, duration: 1 },
            top: { delay: 1 + addedDelay, duration: 1 },
            borderRadius: { delay: 1 + addedDelay, duration: 1 },
            height: { delay: 1 + addedDelay, duration: 1 },
            duration: 1.5,
            ease: "easeInOut",
          },
        }}
        transition={{ delay: 2 }}
        className="absolute w-full rounded-none top-0 left-0"
      />
      {children}
    </motion.div>
  );
};

export default TransformUnderline;
