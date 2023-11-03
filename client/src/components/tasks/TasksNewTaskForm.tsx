import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { colors, fonts } from "../../constants";
import { taskListSelector } from "../../features/taskList/taskListSlice";
import { TaskSchemaType, taskSchema } from "../../schemas";
import TaskTextArea from "../TaskTextArea";
import ToggleSwitch from "../ToggleSwitch";
import TaskNewTaskOverlay from "../tasks/TaskNewTaskOverlay";
import TasksCalender from "./TasksCalender";

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

  return (
    <Formik<TaskSchemaType>
      initialValues={{
        task: "",
        enabledDueDate: false,
        dueDate: undefined,
        onTaskWall: false,
      }}
      onSubmit={() => console.log("first")}
      validationSchema={taskSchema}
    >
      {(props) => {
        const onTaskWall = props.values.onTaskWall;

        const handleToggle = () => {
          props.setFieldValue("onTaskWall", !onTaskWall);
        };

        return (
          <Form
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="absolute w-[250px] h-[320px] cursor-default bottom-5 right-7"
          >
            <TaskNewTaskOverlay variants={formVariants} />
            <div className="p-3  flex flex-col gap-2">
              <h3
                style={{ fontFamily: fonts.exo, color: colors.whiteShades[1] }}
                className="text-start text-xl text-white"
              >
                New task
              </h3>
              <motion.div className="py-1">
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
                  className="flex min-h-[45px] relative isolate px-3 gap-3 rounded-xl  items-center"
                  formikProps={props}
                />
              </AnimatePresence>
              <motion.div
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
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TasksNewTaskForm;
