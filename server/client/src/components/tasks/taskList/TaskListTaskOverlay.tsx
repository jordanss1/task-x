import { AnimationScope, motion, useAnimate } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { colors } from "../../../constants";

type TaskListTaskOverlayPropsType = {
  editing: boolean;
  index: number;
  scope: AnimationScope;
};

const TaskListTaskOverlay = ({
  editing,
  index,
  scope,
}: TaskListTaskOverlayPropsType): ReactElement => {
  const uuid = uuidv4();

  return (
    <>
      <motion.div
        ref={scope}
        layoutDependency={editing}
        layoutId={`edit-pill-${uuid}`}
        animate={{
          bottom: editing ? "-11px" : "-18px",
          height: editing ? "110%" : "130%",
          width: editing ? "115%" : "105%",
          left: editing ? "-15px" : "-3px",
        }}
        style={{
          borderRadius: "20px",
          bottom: "-18px",
          height: "130%",
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
          bottom: editing ? "-11px" : "-18px",
          height: editing ? "110%" : "130%",
          width: editing ? "115%" : "105%",
          left: editing ? "-15px" : "-3px",
          background: !editing ? `rgb(0,0,0,.3)` : `rgb(0,0,0,0)`,
        }}
        style={{
          bottom: "-18px",
          height: "130%",
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
