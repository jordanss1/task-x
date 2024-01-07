import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Variants, motion } from "framer-motion";
import { CSSProperties, ReactElement } from "react";
import { colors, fonts } from "../../constants";
import Button from "../__reusable/Button";
import ModalBackground from "../__reusable/ModalBackground";
import Error from "../svg/Error";
import Question from "../svg/Question";
import Success from "../svg/Success";

export type PopupPropsType = {
  error?: string | null;
  success?: string | null;
  prompt?: {
    onDeny: () => void;
    onAccept: () => void;
    message: string | ReactJSXElement;
  };
};

const PromptVariants: Variants = {
  initial: { filter: "blur(3px)", y: 20, scale: 0.8 },
  animate: {
    filter: "blur(0px)",
    y: 0,
    scale: 1,
    transition: { type: "tween", ease: "easeInOut" },
  },
  exit: {
    filter: "blur(3px)",
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { type: "tween", ease: "easeInOut", opacity: { delay: 0.1 } },
  },
};

const SuccessOrErrorVariants: Variants = {
  initial: { y: "-100%", left: "calc(50% - 140px)" },
  animate: { y: "10%", transition: { type: "tween", ease: "easeInOut" } },
  exit: { y: "-100%", transition: { type: "tween", ease: "easeInOut" } },
};

const Popup = ({ error, success, prompt }: PopupPropsType): ReactElement => {
  const renderSVG = () => {
    if (error) {
      return (
        <div className="rounded-xl p-1">
          <Error size={60} />
        </div>
      );
    }

    if (success) {
      return (
        <div className="rounded-xl p-1">
          <Success size={60} />
        </div>
      );
    }

    if (prompt) {
      return (
        <div className="flex rounded-xl p-1">
          <Question size={70} />
        </div>
      );
    }
  };

  const ButtonStyle: CSSProperties = {
    fontFamily: fonts.jura,
    color: colors.whiteShades[1],
    fontWeight: 800,
  };

  const renderButtons = (
    <div className="flex gap-5">
      <Button
        style={ButtonStyle}
        fontSize={15}
        onClick={() => prompt?.onDeny()}
        label="Cancel"
      />
      <Button
        style={ButtonStyle}
        fontSize={15}
        onClick={() => prompt?.onAccept()}
        label="Sure"
      />
    </div>
  );

  return (
    <>
      {prompt && (
        <ModalBackground
          onClick={() => prompt.onDeny()}
          mixBlendMode="normal"
          background="rgb(0,0,0,.3)"
        />
      )}
      <motion.div
        variants={prompt ? PromptVariants : SuccessOrErrorVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          top: prompt ? "unset" : "0",
          margin: prompt ? "auto" : "0",
          flexDirection: prompt ? "column" : "row",
          inset: prompt ? "0" : "unset",
        }}
        className="fixed px-5 z-30 justify-center items-center mx-auto flex"
      >
        <div
          style={{
            background: colors.purpleGradients[1],
            outline: prompt
              ? "2px solid purple"
              : error
              ? "5px double red"
              : "5px solid green",
            outlineOffset: "3px",
            outlineStyle: "double",
            padding: prompt ? "20px" : "10px",
            height: prompt ? "160px" : "128px",
          }}
          className="h-32 flex flex-col gap-1 overflow-visible rounded-xl justify-center items-center max-w-xs w-full mx-auto"
        >
          <div
            style={{
              flex: prompt ? 1 : 1,
              alignItems: prompt ? "center" : "center",
            }}
            className="flex flex-2"
          >
            {renderSVG()}
            <span
              className="text-sm"
              style={{
                fontFamily: fonts.jura,
                color: colors.whiteShades[1],
                textAlign: prompt ? "center" : "initial",
              }}
            >
              {error || success || prompt?.message}
            </span>
          </div>
          {prompt && renderButtons}
        </div>
      </motion.div>
    </>
  );
};

export default Popup;
