import { AnimationScope, motion, useAnimate } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { colors } from "../../../constants";

type TaskOverlayPropsType = {
  editing: boolean;
  index: number;
  scope: AnimationScope;
};

const TaskOverlay = ({
  editing,
  index,
  scope,
}: TaskOverlayPropsType): ReactElement => {

  return (
    <>
      <motion.div
        ref={scope}
        layoutDependency={editing}
        layoutId={`edit-pill-${index}`}
        animate={{
          bottom: editing ? "0px" : "-18px",
          height: editing ? "101%" : "130%",
        }}
        style={{
          borderRadius: "20px",
          bottom: "-18px",
          height: "130%",
          left: "-2px",
          boxShadow: "1px 1px 5px rgba(0,0,0), -1px -1px 5px rgb(0,0,0)",
          background: `conic-gradient( 
              ${colors.purple} 20%,
              blue 20% 40%,
              ${colors.yellow} 40% 60%,
              ${colors.purple} 60% 80%,
              blue 80%
            )`,
        }}
        className="absolute w-[102%] -z-[5]"
      />
      <motion.div
        layoutDependency={editing}
        layoutId={`edit-overlay-${index}`}
        animate={{
          bottom: editing ? "0px" : "-18px",
          height: editing ? "101%" : "130%",
          background: !editing ? `rgb(0,0,0,.3)` : `rgb(0,0,0,0)`,
        }}
        style={{
          bottom: "-18px",
          height: "130%",
          borderRadius: "20px",
          left: "-2px",
          background: "rgb(0,0,0,.3)",
        }}
        className="absolute w-[102%] -z-[4]"
      />
    </>
  );
};

export default TaskOverlay;
