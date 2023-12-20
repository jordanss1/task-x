import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../constants";

type PopupPropsType = { error: string };

const Popup = ({ error }: PopupPropsType): ReactElement => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: "2%", transition: { type: "tween", ease: "easeInOut" } }}
      exit={{ y: "-100%" }}
      className="absolute px-2 z-30 justify-center w-full flex top-0"
    >
      <div
        style={{
          background: colors.whiteShades[0],
          // border: "3px solid red"
        }}
        className="h-32 flex overflow-visible rounded-xl justify-center items-center max-w-xs w-full"
      >
        <motion.div></motion.div>
        <span className="text-sm" style={{ fontFamily: fonts.jura }}>
          {error}
        </span>
      </div>
    </motion.div>
  );
};

export default Popup;
