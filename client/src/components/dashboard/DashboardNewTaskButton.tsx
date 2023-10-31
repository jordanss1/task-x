import { AnimatePresence, Variants } from "framer-motion";
import { ReactElement, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { colors } from "../../constants";
import { toggleForm } from "../../features/taskList/taskListSlice";
import Button from "../Button";
import SmallIcon from "../SmallIcon";
import TaskNewTaskOverlay from "../tasks/TaskNewTaskOverlay";
import TasksNewTaskForm from "../tasks/TasksNewTaskForm";

const iconVariants: Variants = {
  initial: {
    x: -20,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.8 },
  },
  exit: {
    x: -50,
    transition: { duration: 0.2 },
  },
  hovered: { scale: 1.1 },
  tapped: {
    scale: 0.95,
  },
};

const buttonVariants: Variants = {
  initial: {
    scale: 1,
  },
  animate: (active) => ({ cursor: active ? "default" : "pointer" }),
  exit: { opacity: 1 },
  tapped: (active) => ({ scale: active ? 1 : 0.96 }),
  hovered: (active) => ({ scale: active ? 1 : 1.1 }),
};

const overlayVariants: Variants = {
  initial: {
    borderRadius: "5%",
    background:
      "repeating-linear-gradient(120deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 20% 80%, rgb(202, 255, 159))",
  },
  animate: (hovered) => ({
    borderRadius: "30%",
    background: hovered
      ? "repeating-linear-gradient(120deg, rgb(202, 255, 159) 0%, rgb(153, 31, 255) 40% 60%, rgb(202, 255, 159))"
      : "repeating-linear-gradient(120deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 30% 70%, rgb(202, 255, 159))",
    transition: { borderRadius: { delay: 0.5 } },
  }),
  exit: {
    background: [
      null,
      "repeating-linear-gradient(90deg, rgb(202, 255, 159) 0%, rgb(153, 31, 255) 0% 100%, rgb(202, 255, 159))",
    ],
    transition: {
      duration: 0.2,
    },
  },
};

type DashboardNewTaskButtonPropsType = {
  formActive: boolean;
};

const DashboardNewTaskButton = ({
  formActive,
}: DashboardNewTaskButtonPropsType): ReactElement => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!formActive) {
      dispatch(toggleForm());
      setHovered(false);
    }
  };

  const handleHover = (hovered: boolean) => {
    if (!formActive) setHovered(hovered);
  };

  return (
    <Button
      onClick={(e) => handleClick(e)}
      layout
      layoutRoot
      variants={buttonVariants}
      onMouseEnter={(e) => {
        handleHover(true);
      }}
      onMouseLeave={(e) => {
        handleHover(false);
      }}
      custom={formActive}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hovered"
      whileTap="tapped"
      className="fixed flex isolate items-center overflow-x-hidden justify-center sm:bottom-5 bottom-14 right-4 w-16 h-16 z-[6]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {formActive ? (
          <TasksNewTaskForm key="form" />
        ) : (
          <TaskNewTaskOverlay
            hovered={hovered}
            variants={overlayVariants}
            key="overlay"
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        {!formActive && (
          <SmallIcon
            key="icon"
            variants={iconVariants}
            initial="initial"
            exit="exit"
            style={{
              color: colors.whiteShades[1],
              scale: 1,
            }}
            size={25}
            icon="fa-plus fa-solid"
          />
        )}
      </AnimatePresence>
    </Button>
  );
};

export default DashboardNewTaskButton;
