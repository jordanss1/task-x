import { motion } from "framer-motion";
import { CSSProperties, ReactElement } from "react";

type ModalBackgroundPropsType = {
  onClick?: () => void;
  zIndex?: number;
  blur?: boolean;
  background?: string;
  mixBlendMode?: CSSProperties["mixBlendMode"];
  width?: CSSProperties["width"];
};

const ModalBackground = ({
  onClick,
  blur = false,
  zIndex = 9,
  width = "auto",
  mixBlendMode = "screen",
  background = "linear-gradient(130deg, rgb(46, 46, 46), #e0dcd9, rgb(46, 46, 46)",
}: ModalBackgroundPropsType): ReactElement => {
  return (
    <>
      <motion.div
        onClick={onClick}
        style={{ zIndex, width }}
        className="absolute inset-0"
      />
      {blur ? (
        <motion.div
          initial={{
            backdropFilter: "blur(0px) drop-shadow(0px 0px 0px black)",
            background: "rgba(0,0,0,0)",
          }}
          animate={{
            background,
            backdropFilter: "blur(2px) drop-shadow(5px 1px 2px white)",
          }}
          exit={{
            backdropFilter: "blur(0px) drop-shadow(0px 0px 0px black)",
            background: "rgba(0,0,0,0)",
          }}
          style={{ zIndex: zIndex - 2 }}
          className="modal_blur absolute inset-0"
        />
      ) : (
        <motion.div
          className="modal_normal absolute inset-0"
          style={{ background, zIndex: zIndex - 1, mixBlendMode }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 1 },
          }}
          exit={{
            opacity: 0,
          }}
        />
      )}
    </>
  );
};

export default ModalBackground;