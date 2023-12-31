import { Form, Formik, FormikConfig } from "formik";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../app/store";
import { colors, fonts } from "../../constants";
import {
  submitTask,
  taskListSelector,
} from "../../features/taskList/taskListSlice";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import { TaskSchemaType, taskSchema } from "../../schemas";
import SmallIcon from "../__reusable/SmallIcon";
import TaskTextArea from "../__reusable/TaskTextArea";
import ToggleSwitch from "../__reusable/ToggleSwitch";
import TaskNewTaskOverlay from "../tasks/TaskNewTaskOverlay";
import TasksCalender from "./TasksCalender";

const overlayVariants: Variants = {
  initial: {
    borderRadius: "5%",
    boxShadow:
      "1px 3px 10px rgba(0,0,0), -1px -1px 5px rgba(0,0,0), inset 0px 1px 1px rgba(0,0,0), inset 0px 1px 1px rgba(0,0,0)",
    backgroundColor: "rgb(0,0,0,0)",
  },
  animate: {
    borderRadius: "5%",
    backgroundColor: "rgb(0,0,0,0)",
    backgroundImage: [
      `radial-gradient(circle at 100% 100%, transparent 5%, rgb(0,0,0)), radial-gradient(circle at 100% 0%, transparent 5%, rgb(0,0,0)), repeating-conic-gradient(from 0deg at 10% 50%, rgb(0,0,0) 0deg 10deg, rgb(0,0,255) 10deg 20deg, rgb(0,0,0) 28deg 30deg)`,
      `radial-gradient(circle at 100% 100%, transparent 65%, rgb(0,0,0)), radial-gradient(circle at 100% 0%, transparent 65%, ${colors.yellow}), repeating-conic-gradient(from 20deg at 10% 50%, ${colors.purple} 0deg 10deg, rgb(0,0,255) 10deg 20deg, ${colors.yellow} 28deg 30deg)`,
      `radial-gradient(circle at -10% 50%, transparent 0%, rgb(0,0,0)), radial-gradient(circle at 100% 0%, transparent 50%, ${colors.purple}), repeating-conic-gradient(from 60deg at 10% 50%, ${colors.purple} 0deg 10deg, rgb(0,0,255) 10deg 20deg, ${colors.yellow} 28deg 30deg)`,
      `radial-gradient(circle at -10% 50%, transparent 0%, rgb(0,0,0)), radial-gradient(circle at 100% 0%, transparent 40%, rgb(0,0,0)), repeating-conic-gradient(from 60deg at 10% 50%, ${colors.purple} 0deg 10deg, rgb(0,0,255) 10deg 20deg, ${colors.yellow} 28deg 30deg)`,
    ],
    backgroundSize: [
      "100% 100%, 0% 0%, 50rem 20rem",
      "100% 100%, 2% 2%, 50rem 20rem",
      "100% 100%, 1% 1%, 50rem 20rem",
    ],

    boxShadow:
      "1px 3px 10px rgba(0,0,0), -1px -1px 10px rgba(0,0,0), inset 3px 3px 30px rgba(0,0,0), inset -3px -3px 30px rgba(0,0,0)",

    transition: {
      backgroundImage: { duration: 1.2, ease: "easeOut" },
      backgroundSize: { duration: 0.4, delay: 0.1, ease: "anticipate" },
    },
  },
  exit: {
    x: 213,
    y: 273,
    width: "64px",
    height: "64px",
    backgroundImage: [
      `radial-gradient(circle at -10% 50%, transparent 0%, rgb(0,0,0)), radial-gradient(circle at 100% 0%, transparent 40%, rgb(0,0,0)), repeating-conic-gradient(from 40deg at 10% 50%, ${colors.purple} 0deg 10deg, rgb(0,0,255) 10deg 20deg, ${colors.yellow} 28deg 30deg)`,
      `radial-gradient(circle at -10% 50%, transparent 0%, rgb(0,0,0)), radial-gradient(circle at 100% 0%, transparent 40%, rgb(0,0,0)), repeating-conic-gradient(from 20deg at 10% 50%, ${colors.purple} 20deg 30deg, rgb(0,0,255) 30deg 40deg, ${colors.yellow} 48deg 50deg)`,
      `radial-gradient(circle at 50% 50%, transparent 70%, rgb(0,0,0)), radial-gradient(circle at 100% 0%, transparent 80%, rgb(0,0,0)), repeating-conic-gradient(from 0deg at 10% 50%, ${colors.purple} 20deg 30deg, ${colors.purple} 30deg 40deg, ${colors.purple} 48deg 50deg)`,
    ],
    borderRadius: [null, "30%"],
    boxShadow:
      "1px 3px 10px rgba(0,0,0,0), -1px -1px 10px rgba(0,0,0,0), inset 10px 10px 10px rgba(0,0,0,0), inset -10px -10px 10px rgba(0,0,0,0)",
    transition: {
      duration: 0.6,
      boxShadow: { duration: 0.3 },
      backgroundImage: { duration: 0.3, delay: 0.2 },
      borderRadius: { delay: 0.6 },
      x: { delay: 0.5, duration: 0.5 },
      y: { delay: 0.5, duration: 0.5 },
      height: { delay: 0.4 },
      width: { delay: 0.4 },
    },
  },
  tapped: {},
  hovered: {},
};

const formVariants: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      when: "afterChildren",
    },
  },
};

const childVariants: Variants = {
  initial: (x) => ({
    opacity: 0,
    x,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
  },
};

const TasksNewTaskForm = (): ReactElement => {
  const { formActive } = useSelector(taskListSelector);
  const dispatch = useDispatch<AppThunkDispatch>();
  const mobile = useMediaQuery(640);

  const handleSubmit: FormikConfig<TaskSchemaType>["onSubmit"] = (
    values,
    actions
  ) => {
    dispatch(submitTask(values));
  };

  return (
    <Formik<TaskSchemaType>
      initialValues={{
        task: "",
        enabledDueDate: false,
        dueDate: undefined,
        onTaskWall: false,
      }}
      onSubmit={handleSubmit}
      validateOnBlur
      validationSchema={taskSchema}
    >
      {(props) => {
        const onTaskWall = props.values.onTaskWall;

        const handleToggle = () => {
          props.setFieldValue("onTaskWall", !onTaskWall);
        };

        return (
          <motion.form
            exit={{
              right: "1.75rem",
              transition: {
                delay: 0.1,
                duration: 1,
              },
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="absolute w-[250px] h-[320px] cursor-default bottom-10 sm:bottom-5 -right-[106px] sm:right-7"
          >
            <TaskNewTaskOverlay variants={overlayVariants} />
            <AnimatePresence mode="wait">
              {formActive && (
                <motion.div
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="form"
                  className="p-4 h-full justify-evenly flex flex-col gap-2"
                >
                  <motion.h3
                    variants={childVariants}
                    custom={40}
                    style={{
                      fontFamily: fonts.jura,
                      color: colors.whiteShades[1],
                      textShadow: "1px 1px black, -1px -1px black",
                    }}
                    className="text-start text-xl text-white"
                  >
                    New task
                  </motion.h3>
                  <motion.div
                    variants={childVariants}
                    custom={-40}
                    className="py-1 relative"
                  >
                    <TaskTextArea
                      name="task"
                      className="paper border-b-0 relative resize-none text-sm px-3 w-full rounded-xl max-w-full"
                      style={{
                        outline: `2px solid rgb(180,180,180)`,
                        fontFamily: fonts.jura,
                        boxShadow: `inset 1px 1px 10px rgb(80,80,80), inset -1px -1px 10px rgb(80,80,80)`,
                      }}
                    />
                  </motion.div>
                  <AnimatePresence mode="wait">
                    <TasksCalender
                      style={{
                        outline: "rgb(180, 180, 180) solid 1px",
                        background: colors.blackGradient[1],
                      }}
                      variants={childVariants}
                      custom={40}
                      className="flex min-h-[45px] relative isolate px-3 gap-3 rounded-xl  items-center"
                      formikProps={props}
                    />
                  </AnimatePresence>
                  <motion.div
                    variants={childVariants}
                    custom={-40}
                    style={{
                      background: colors.blackGradient[1],
                      outline: "rgb(180, 180, 180) solid 1px",
                    }}
                    className="task-toggle isolate relative w-full p-1 rounded-xl ms-auto"
                  >
                    <ToggleSwitch
                      label={onTaskWall ? "Public" : "Private"}
                      handleToggle={handleToggle}
                      name="onTaskWall"
                    />
                  </motion.div>
                  <motion.div
                    onClick={() => props.submitForm()}
                    style={{
                      background: colors.buttonGradients[1],
                      borderRadius: "30%",
                    }}
                    variants={childVariants}
                    custom={40}
                    whileHover={{
                      background: colors.hoveredButtonGradient,
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 flex cursor-pointer items-center justify-center ml-auto"
                  >
                    <SmallIcon
                      style={{ color: colors.whiteShades[1] }}
                      size={15}
                      icon="fa-solid fa-plus"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        );
      }}
    </Formik>
  );
};

export default TasksNewTaskForm;
