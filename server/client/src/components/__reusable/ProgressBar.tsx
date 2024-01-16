import { motion } from "framer-motion";
import { ReactElement, useEffect } from "react";

type ProgressBarType = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarType): ReactElement => {
  return (
    <div
      style={{ background: progress ? "grey" : "transparent" }}
      className="fixed w-full z-20 left-0 top-0 h-[5px]"
    >
      <motion.div
        className="relative h-full bg-[#991ff1]"
        style={{
          border: progress ? "1px solid white" : "0px solid white",
        }}
        initial={{ width: "0%" }}
        animate={{
          width: `${progress}%`,
          transition: { type: "tween", ease: "linear" },
        }}
      />
    </div>
  );
};

export default ProgressBar;
