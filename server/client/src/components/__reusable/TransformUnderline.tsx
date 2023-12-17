import { motion } from "framer-motion";
import { CSSProperties, ReactElement, ReactNode } from "react";
import { colors } from "../../constants";

type TransformUnderlinePropsType = {
  backgroundColors?: CSSProperties["background"][];
  children?: ReactNode;
  addedDelay?: number;
};

const TransformUnderline = ({
  backgroundColors = [colors.blackGradient[1], colors.buttonGradients[1]],
  addedDelay = 0,
  children,
}: TransformUnderlinePropsType): ReactElement => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="relative h-fit w-fit p-1 text-xl"
    >
      <motion.div
        style={{
          background: backgroundColors[0],
          height: "5%",
        }}
        animate={{
          height: ["3%", "60%", "3%"],
          background: [...backgroundColors],
          top: "97%",
          borderRadius: ["0px", "10px", "0px"],
          transition: {
            top: { delay: 1 + addedDelay, duration: 0.5 },
            background: {
              delay: 0 + addedDelay,
              duration: 0.5,
            },
            borderRadius: { delay: 0.5 + addedDelay, duration: 0.5 },
            height: { delay: 0.5 + addedDelay, duration: 1 },
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
