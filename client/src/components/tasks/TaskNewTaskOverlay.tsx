import { Variants, motion } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { taskListSelector } from "../../features/taskList/taskListSlice";

const TaskNewTaskOverlay = ({
  variants,
  hovered,
}: {
  hovered?: boolean;
  variants: Variants;
}): ReactElement => {
  const { formActive } = useSelector(taskListSelector);

  return (
    <motion.div
      layoutId="overlay"
      layoutDependency={formActive}
      variants={variants}
      custom={hovered}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        layout: { duration: 0.8, delay: 0, type: "tween", ease: "backInOut" },
      }}
      className="button_overlay absolute inset-0 -z-10"
      style={{
        background:
          "linear-gradient(120deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 20% 60%, rgb(202, 255, 159))",
        boxShadow:
          "1px 3px 10px rgba(0,0,0,.7), -1px -1px 5px rgba(0,0,0), inset 0px 1px 1px rgba(0,0,0,0), inset 0px 1px 1px rgba(0,0,0,0)",
        borderRadius: "30%",
      }}
    />
  );
};

export default TaskNewTaskOverlay;
