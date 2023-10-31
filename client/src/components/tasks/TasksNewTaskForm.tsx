import { useFormik } from "formik";
import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { taskListSelector } from "../../features/taskList/taskListSlice";
import { NewTaskType, newTaskSchema } from "../../schemas";
import TaskNewTaskOverlay from "../tasks/TaskNewTaskOverlay";

const formVariants: Variants = {
  initial: {
    borderRadius: "30%",
  },
  animate: {
    borderRadius: "5%",
    transition: { borderRadius: { delay: 0.4 } },
  },
  exit: {
    background: [
      null,
      "repeating-linear-gradient(90deg, rgb(202, 255, 159) 0%, rgb(153, 31, 255) 0% 100%, rgb(202, 255, 159))",
    ],
    transition: {
      duration: 0.4,
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
    </motion.form>
  );
};

export default TasksNewTaskForm;
