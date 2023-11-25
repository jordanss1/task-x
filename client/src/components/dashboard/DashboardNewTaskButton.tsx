import { AnimatePresence, Variants, motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { colors } from "../../constants";
import { toggleForm } from "../../features/taskList/taskListSlice";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
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
    transition: { delay: 1 },
  },
  exit: {
    x: 50,
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
  animate: (active) => ({
    cursor: active ? "default" : "pointer",
  }),
  exit: { opacity: 1 },
  tapped: (active) => ({ scale: active ? 1 : 0.96 }),
  hovered: (active) => ({ scale: active ? 1 : 1.1 }),
};

const overlayVariants: Variants = {
  initial: {
    borderRadius: "5%",
    backgroundImage:
      "linear-gradient(120deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 20% 80%, rgb(202, 255, 159))",
  },
  animate: ({ hovered, active }) => ({
    borderRadius: hovered ? "50%" : "30%",
    backgroundImage: hovered
      ? "linear-gradient(120deg, rgb(202, 255, 159) 0%, rgb(153, 31, 255) 40% 60%, rgb(202, 255, 159))"
      : "linear-gradient(120deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 30% 70%, rgb(202, 255, 159))",
    transition: { borderRadius: { delay: active ? 0.5 : 0 } },
  }),
  exit: ({ hovered, active, mobile }) => ({
    y: [0, -270],
    x: mobile ? [0, -100] : [0, -220],
    borderRadius: ["50%", "5%"],
    width: "250px",
    height: "320px",
    filter: "blur(0px)",
    boxShadow:
      "1px 3px 10px rgba(0,0,0), -1px -1px 5px rgba(0,0,0), inset 1px 1px 1px rgba(0,0,0), inset 1px 1px 1px rgba(0,0,0)",
    backgroundColor: "rgb(153, 31, 255,0)",
    backgroundImage: [
      `radial-gradient(circle at -10% 50%, transparent 50%, rgb(0,0,0)), radial-gradient(circle at 100% 0%, transparent 50%, rgb(0,0,0)), repeating-conic-gradient(from 0deg at 15% 50%, ${colors.purple} 0deg 10deg, ${colors.purple} 10deg 20deg, ${colors.purple} 28deg 30deg)`,
      `radial-gradient(circle at 50% 50%, transparent 50%, rgb(0,0,0)), radial-gradient(circle at 100% 0%, transparent 80%, rgb(0,0,0)), repeating-conic-gradient(from 0deg at 10% 50%, ${colors.purple} 0deg 10deg, ${colors.purple} 10deg 20deg, ${colors.yellow} 28deg 30deg)`,
    ],
    backgroundSize: [
      "100% 100%, 0% 0%, 50rem 20rem",
      "100% 100%, 0% 0%, 50rem 20rem",
    ],
    transition: {
      borderRadius: { duration: 0.2, delay: 0.3 },
      x: { ease: "easeInOut", duration: 0.5, delay: 0.1 },
      y: { ease: "easeInOut", duration: 0.5, delay: 0.1 },
      width: { ease: "easeInOut", duration: 0.4, delay: 0.2 },
      height: { ease: "easeInOut", duration: 0.4, delay: 0.2 },
      backgroundImage: {
        duration: 0.2,
        delay: 0.4,
        ease: "easeInOut",
      },
      backgroundSize: {
        duration: 0.1,
        delay: 0.3,
        ease: "easeIn",
      },
    },
  }),
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
    <motion.div
      style={{
        justifyContent: formActive
          ? "var(--active-justify)"
          : "var(--inactive-justify)",
      }}
      className="w-full pr-3 fixed right-0 flex isolate items-center justify-end sm:bottom-5 bottom-14 sm:[--active-justify:flex-end] sm:[--inactive-justify:flex-end] [--active-justify:center] [--inactive-justify:flex-end]"
    >
      <Button
        onClick={(e) => handleClick(e)}
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
        className="flex relative isolate items-center overflow-x-hidden justify-center sm:w-16 sm:h-16 h-14 w-14 z-[6] sm:[--right-active:16px] sm:[--right-inactive:16px] sm:[--left-active:unset] sm:[--left-inactive:unset] sm:[--bottom-active:20px] sm:[--bottom-inactive:25px] [--bottom-active:86px] [--bottom-inactive:56px] sm:[--ml-active:0px] sm:[--ml-inactive:0px] [--ml-active:90px] [--ml-inactive:0px] [--right-active:0px] [--right-inactive:16px] [--left-active:calc(100%_-_50%)] [--left-inactive:calc(100%_-_32%)]"
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
    </motion.div>
  );
};

export default DashboardNewTaskButton;
