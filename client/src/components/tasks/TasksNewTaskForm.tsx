import { useFormik } from "formik";
import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { colors, fonts } from "../../constants";
import { taskListSelector } from "../../features/taskList/taskListSlice";
import { NewTaskType, newTaskSchema } from "../../schemas";
import TaskNewTaskOverlay from "../tasks/TaskNewTaskOverlay";

const formVariants: Variants = {
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
    x: 210,
    y: 270,
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
      duration: 0.7,
      boxShadow: { duration: 0.3 },
      backgroundImage: { duration: 0.4 },
      borderRadius: { delay: 0.5 },
      x: { delay: 0.4, duration: 0.5 },
      y: { delay: 0.4, duration: 0.5 },
      height: { delay: 0.3 },
      width: { delay: 0.3 },
    },
  },
  tapped: {},
  hovered: {},
};

const TasksNewTaskForm = (): ReactElement => {
  const { formActive } = useSelector(taskListSelector);

  const { values, handleChange, handleBlur, handleSubmit, errors } =
    useFormik<NewTaskType>({
      initialValues: { task: "", dueDate: false, visibility: false },
      onSubmit: () => console.log("first"),
      validationSchema: newTaskSchema,
    });

  return (
    <motion.form
      onClick={(e) => e.stopPropagation()}
      layout
      className="absolute w-[250px] h-[320px] cursor-default bottom-5 right-7"
      onSubmit={handleSubmit}
    >
      <TaskNewTaskOverlay variants={formVariants} />
      <div className="p-3">
        <h3
          style={{ fontFamily: fonts.exo, color: colors.whiteShades[1] }}
          className="text-start text-xl text-white"
        >
          New task
        </h3>
      </div>
    </motion.form>
  );
};

export default TasksNewTaskForm;
