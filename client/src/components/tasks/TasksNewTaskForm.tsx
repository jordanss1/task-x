import { useFormik } from "formik";
import { motion, Variants } from "framer-motion";
import { ReactElement } from "react";
import { colors } from "../../constants";
import { newTaskSchema, NewTaskType } from "../../schemas";

const formVariants: Variants = {
  initial: {
    background:
      "repeating-linear-gradient(320deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 60%, rgb(202, 255, 159))",
    boxShadow:
      "1px 1px 2px rgba(0, 0, 0, 0.5), -1px -3px 10px rgba(0, 0, 0, 0.6), inset 1px 1px 2px rgba(0, 0, 0, 0.5), inset -1px -3px 10px rgba(0, 0, 0, 0.6)",
    x: 30,
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    background: `repeating-linear-gradient(320deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 60%, rgb(202, 255, 159))`,
    boxShadow:
      "1px 3px 20px rgba(0, 0, 0), -1px -3px 30px rgba(0, 0, 0, 0.6), inset 1px 1px 2px rgba(0, 0, 0, 0.5), inset -0px -0px 1px rgba(0, 0, 0, 0.6)",
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      ease: "backInOut",
      type: "tween",
      duration: 0.8,
      background: { delay: 0.2, duration: 0.2 },
      boxShadow: { delay: 0.4 },
    },
  },
  exit: {
    background: `repeating-radial-gradient(circle at bottom right, ${colors.purple} 0% 10%, rebeccapurple 20%)`,
    width: "auto",
  },
};

const TasksNewTaskForm = (): ReactElement => {
  const { values, handleChange, handleBlur, handleSubmit, errors } =
    useFormik<NewTaskType>({
      initialValues: { task: "", dueDate: false, visibility: false },
      onSubmit: () => console.log("first"),
      validationSchema: newTaskSchema,
    });

  return (
    <motion.form
      variants={formVariants}
      initial="initial"
      animate="animate"
      layout
      onMouseOverCapture={(e) => e.stopPropagation()}
      onPointerDownCapture={(e) => e.stopPropagation()}
      style={{
        borderRadius: "5%",
      }}
      className="absolute origin-bottom-right w-[250px] h-[320px] cursor-default mix-blend-multiply bottom-[70px] right-[70px]"
      onSubmit={handleSubmit}
    ></motion.form>
  );
};

export default TasksNewTaskForm;
