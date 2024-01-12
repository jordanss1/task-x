import { AnimationScope, motion, useAnimate } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { colors } from "../../../constants";

type TaskListTaskOverlayPropsType = {
  editing: boolean;
  uuid: string;
  scope: AnimationScope;
};

const TaskListTaskOverlay = ({
  editing,
  uuid,
  scope,
}: TaskListTaskOverlayPropsType): ReactElement => {
  return (
    <>
      <motion.div
        ref={scope}
        layoutDependency={editing}
        layoutId={`edit-pill-${uuid}`}
        animate={{
          top: editing ? "-4%" : "-17.5%",
          bottom: editing ? "25%" : "-2%",
          height: editing ? "285px" : "185px",
          width: editing ? "115%" : "105%",
          left: editing ? "-15px" : "-3px",
          transition: {
            duration: 0.4,
            type: "tween",
            ease: "linear",
          },
        }}
        style={{
          borderRadius: "20px",
          bottom: "-2%",
          height: "185px",
          top: "initial",
          width: "105%",
          left: "-3px",
          boxShadow: "1px 1px 5px rgba(0,0,0), -1px -1px 5px rgb(0,0,0)",
          background: `conic-gradient( 
              ${colors.purple} 20%,
              blue 20% 40%,
              ${colors.yellow} 40% 60%,
              ${colors.purple} 60% 80%,
              blue 80%
            )`,
        }}
        className="absolute  -z-[5]"
      />
      <motion.div
        layoutDependency={editing}
        layoutId={`edit-overlay-${uuid}`}
        animate={{
          top: editing ? "0%" : "-17.5%",
          bottom: editing ? "0%" : "-2%",
          height: editing ? "185px" : "185px",
          width: editing ? "115%" : "105%",
          left: editing ? "-15px" : "-3px",
          background: !editing ? `rgb(0,0,0,.3)` : `rgb(0,0,0,0)`,
          transition: {
            duration: editing ? 0.1 : 0.4,
            type: "tween",
            ease: "easeInOut",
            background: {
              duration: 0.1,
            },
          },
        }}
        style={{
          top: "initial",
          bottom: "-2%",
          height: "185px",
          width: "105%",
          borderRadius: "20px",
          left: "-3px",
          background: "rgb(0,0,0,.3)",
        }}
        className="absolute w-[108%] -z-[4]"
      />
    </>
  );
};

export default TaskListTaskOverlay;
