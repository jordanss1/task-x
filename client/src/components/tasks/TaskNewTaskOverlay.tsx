import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { taskListSelector } from "../../features/taskList/taskListSlice";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";

const buttonVariants: Variants = {
  initial: {
    borderRadius: "5%",
    backgroundImage:
      "linear-gradient(120deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 20% 80%, rgb(202, 255, 159))",
  },
  animate: ({ hovered, active }) => ({
    borderRadius: hovered ? "50%" : "30%",
    backgroundImage: hovered
      ? "linear-gradient(120deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 0% 100%, rgb(202, 255, 159))"
      : "linear-gradient(120deg, rgb(153, 31, 255,0) 0%, rgb(153, 31, 255,0) 30% 70%, rgb(202, 255, 159,0))",
    filter: hovered ? "blur(10px)" : "blur(0px)",
    transition: { borderRadius: { delay: active ? 0.5 : 0 } },
  }),
  exit: {
    y: [0, -270],
    x: [0, -220],
    borderRadius: ["50%", "5%"],
    width: "250px",
    height: "320px",
    filter: "blur(0px)",
    backgroundImage: "",
    transition: {
      borderRadius: { duration: 0.2, delay: 0.3 },
      x: { ease: "easeInOut", duration: 0.5, delay: 0.1 },
      y: { ease: "easeInOut", duration: 0.5, delay: 0.1 },
      width: { ease: "easeInOut", duration: 0.4, delay: 0.2 },
      height: { ease: "easeInOut", duration: 0.4, delay: 0.2 },
    },
  },
};

const formVariants: Variants = {
  initial: {
    borderRadius: "5%",
    backgroundImage:
      "linear-gradient(120deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 20% 80%, rgb(202, 255, 159))",
    filter: "blur(25px)",
    y: 35,
  },
  animate: ({ hovered, active }) => ({
    borderRadius: hovered ? "50%" : "30%",
    backgroundImage:
      "linear-gradient(to left, rgb(153, 31, 255) 30%, rgb(0, 0, 255) 40%, rgb(153, 31, 255))",

    filter: "blur(30px)",
    transition: { borderRadius: { delay: active ? 0.5 : 0 } },
  }),
  exit: {
    x: 210,
    y: 270,
    width: "64px",
    height: "64px",
    filter: "blur(0px)",
    backgroundImage:
      "radial-gradient(circle at 100% 100%, transparent 100%, rgb(0,0,0)), radial-gradient(circle at 40% 40%, transparent 100%, rgb(0,0,0)), linear-gradient(to left, transparent 100%, rgb(0,0,255))",
    borderRadius: [null, "30%"],
    transition: {
      duration: 0.7,
      backgroundImage: { duration: 0.6 },
      borderRadius: { delay: 0.7 },
      x: { delay: 0.6, duration: 0.5 },
      y: { delay: 0.6, duration: 0.5 },
      height: { delay: 0.5 },
      width: { delay: 0.5 },
    },
  },
};

const TaskNewTaskOverlay = ({
  variants,
  hovered,
}: {
  hovered?: boolean;
  variants: Variants;
}): ReactElement => {
  const { formActive } = useSelector(taskListSelector);
  const mobile = useMediaQuery(640);

  return (
    <>
      <motion.div
        layoutId="overlay"
        layoutDependency={formActive}
        variants={variants}
        custom={{ hovered, formActive, mobile }}
        initial="initial"
        animate="animate"
        exit="exit"
        className="button_overlay overflow-x-hidden absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 20% 60%, rgb(202, 255, 159))",
          boxShadow:
            "1px 3px 10px rgba(0,0,0,.7), -1px -1px 5px rgba(0,0,0), inset 0px 1px 1px rgba(0,0,0,0), inset 0px 1px 1px rgba(0,0,0,0)",
          borderRadius: "30%",
        }}
      />
      <motion.div
        layoutId="glow"
        layoutDependency={formActive}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{ hovered, formActive }}
        variants={variants.tapped === undefined ? buttonVariants : formVariants}
        style={{ borderRadius: "30%", filter: "blur(0px)", y: 10, scale: 0.9 }}
        className="absolute inset-0 -z-[11]"
      />
    </>
  );
};

export default TaskNewTaskOverlay;
