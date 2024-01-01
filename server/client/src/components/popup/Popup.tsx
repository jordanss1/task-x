import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../constants";
import Error from "../svg/Error";

type PopupPropsType = { error: string | null; success: string | null };

const Popup = ({ error, success }: PopupPropsType): ReactElement => {
  const renderSVG = () => {
    if (error) {
      return (
        <div className="rounded-xl p-1">
          <Error size={60} />
        </div>
      );
    }

    if (success) {
      return <div></div>;
    }
  };

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: "10%", transition: { type: "tween", ease: "easeInOut" } }}
      exit={{ y: "-100%", transition: { type: "tween", ease: "easeInOut" } }}
      className="absolute px-2 z-30 justify-center w-full flex top-0"
    >
      <div
        style={{
          background: colors.purpleGradients[1],
          outline: error ? "5px double red" : "5px solid green",
          outlineOffset: "3px",
          outlineStyle: "double",
        }}
        className="h-32 flex gap-1 overflow-visible rounded-xl justify-center items-center max-w-xs w-full"
      >
        {renderSVG()}
        <span
          className="text-sm"
          style={{ fontFamily: fonts.jura, color: colors.whiteShades[1] }}
        >
          {error || success}
        </span>
      </div>
    </motion.div>
  );
};

export default Popup;
