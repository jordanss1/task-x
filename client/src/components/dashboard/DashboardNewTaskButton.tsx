import { AnimatePresence, Variants, useAnimate } from "framer-motion";
import { ReactElement, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { colors } from "../../constants";
import { toggleForm } from "../../features/taskList/taskListSlice";
import Button from "../Button";
import SmallIcon from "../SmallIcon";
import TasksNewTaskForm from "../tasks/TasksNewTaskForm";

type DashboardNewTaskButtonPropsType = {
  formActive: boolean;
};

const DashboardNewTaskButton = ({
  formActive,
}: DashboardNewTaskButtonPropsType): ReactElement => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);

  const buttonProps = {
    style: {
      background: colors.buttonGradients[1],
      boxShadow:
        "1px 3px 10px rgba(0,0,0,.7), -1px -1px 5px rgba(0,0,0), inset 0px 1px 1px rgba(0,0,0,0), inset 0px 1px 1px rgba(0,0,0,0)",
    },
  };

  const buttonHover = {
    width: hovered ? "70px" : "64px",
    height: hovered ? "70px" : "64px",
    background: hovered
      ? colors.hoveredButtonGradient
      : colors.buttonGradients[1],
    boxShadow: hovered
      ? "1px 1px 5px rgba(0,0,0), -1px -1px 10px rgba(0,0,0,.5), inset .3px .3px 1px rgb(202, 255, 159), inset -.3px -.3px 1px rgb(202, 255, 159)"
      : "1px 3px 10px rgba(0,0,0,.7), -1px -1px 5px rgba(0,0,0), inset 0px 1px 1px rgba(0,0,0,0), inset 0px 1px 1px rgba(0,0,0,0)",
  };

  const buttonTap = {
    width: tapped ? "62px" : "70px",
    height: tapped ? "62px" : "70px",
    background: colors.tappedButtonGradient,
    boxShadow:
      "1px 1px 10px rgba(0,0,0), -1px -1px 0px rgba(0,0,0), inset 1px 1px 5px rgb(202, 255, 159), inset -1px -1px 5px rgb(202, 255, 159)",
    transition: { duration: 0.1, type: "tween" },
  };

  const iconVariants: Variants = {
    initial: (icon) => ({
      x: icon === "x" ? -50 : -50,
    }),
    animate: {
      x: 0,
    },
    exit: (icon) => ({
      x: icon === "x" ? -50 : -50,
    }),
    hovered: { scale: hovered ? 1.1 : 1 },
    tapped: {
      scale: tapped ? 0.95 : 1.1,
    },
  };

  const renderIcon = (
    <SmallIcon
      key={formActive ? "x" : "plus"}
      variants={iconVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={formActive ? "x" : "plus"}
      style={{ color: formActive ? "red" : colors.whiteShades[1], scale: 1 }}
      size={formActive ? 22 : 25}
      icon={`fa-${formActive ? "x" : "plus"} fa-solid`}
    />
  );

  return (
    <Button
      layout
      onClick={(e) => {
        e.stopPropagation();
        dispatch(toggleForm());
      }}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={() => setTapped(true)}
      onPointerUp={() => setTapped(false)}
      {...buttonProps}
      whileHover={buttonHover}
      whileTap={buttonTap}
      className="fixed flex overflow-x-hidden isolate items-center justify-center rounded-[30%] cursor-pointer sm:bottom-5 bottom-14 right-4 w-16 h-16 bg-black z-[6]"
    >
      <AnimatePresence mode="wait">
        {formActive && <TasksNewTaskForm />}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        {renderIcon}
      </AnimatePresence>
    </Button>
  );
};

export default DashboardNewTaskButton;
