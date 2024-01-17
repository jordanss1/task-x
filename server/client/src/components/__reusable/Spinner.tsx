import { motion } from "framer-motion";
import { CSSProperties, ReactElement } from "react";
import { colors } from "../../constants";

type SpinnerPropsType = {
  size?: "small" | "medium" | "large";
  color?: CSSProperties["color"];
  position?: CSSProperties["position"];
};

const Spinner = ({
  size = "small",
  color = colors.whiteShades[1],
  position = "fixed",
}: SpinnerPropsType): ReactElement => {
  const padding =
    size === "small" ? "8px" : size === "medium" ? "16px" : "24px";

  const borderSize = size === "small" ? "4px" : "8px";

  return (
    <motion.div
      className="rounded-full z-100"
      style={{
        position,
        border: `${borderSize} solid rgb(150,150,150)`,
        borderTop: `${borderSize} solid ${color}`,
        padding,
        maxHeight: "fit-content",
        maxWidth: "fit-content",
      }}
      initial={{ rotate: 0 }}
      animate={{
        rotate: [0, 360],
        transition: {
          rotate: {
            duration: 1,
            repeat: Infinity,
            type: "tween",
            ease: "linear",
          },
        },
      }}
    />
  );
};

export default Spinner;
