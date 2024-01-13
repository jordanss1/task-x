import { FormikProps } from "formik";
import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { colors, fonts } from "../../../constants";
import { taskListSelector } from "../../../features/taskList/taskListSlice";
import { TaskSubmitSchemaType } from "../../../schemas";
import Button from "../../__reusable/Button";
import SmallIcon from "../../__reusable/SmallIcon";
import TaskListTaskStatusPopout from "./TaskListTaskStatusPopout";

interface TaskListTaskStatusPropsType
  extends FormikProps<TaskSubmitSchemaType> {
  dueDate: string | undefined;
  editing: boolean;
  complete: boolean;
  handleEdit: (reset?: boolean) => void;
  handleDelete: () => void;
  handleComplete: () => void;
}

const containerVariants: Variants = {
  animate: (editing: boolean) => ({
    background: editing ? colors.blackGradient[1] : colors.blackGradient[0],
    outline: editing
      ? "1px solid rgb(224, 220, 217)"
      : "1px solid rgb(224, 220, 217,0)",
    padding: editing ? "5px" : "0px",
  }),
};

const buttonVariants: Variants = {
  animate: (editing: boolean) => ({
    outline: editing
      ? "1px solid rgb(224, 220, 217)"
      : "1px solid rgb(224, 220, 217,0)",
  }),
  hovered: (editing) => ({
    scale: 1.01,
    background: editing
      ? colors.hoveredButtonGradient
      : colors.buttonGradients[0],
    boxShadow: editing
      ? "1px 1px 3px rgba(0,0,0), -1px -1px 3px rgba(0,0,0,.5), inset .3px .3px 1px rgb(202, 255, 159), inset -.3px -.3px 1px rgb(202, 255, 159)"
      : "1px 1px 0px rgba(0,0,0,0), -1px -1px 1px rgba(0,0,0), inset 0px 0px 1px rgba(0,0,0,.5), inset -1px -1px 3px rgba(0,0,0,.5)",
    transition: { type: "tween" },
  }),
  tapped: (editing) => ({
    scale: 0.98,
    background: editing
      ? colors.hoveredButtonGradient
      : colors.buttonGradients[0],
    boxShadow: editing
      ? "1px 1px 5px rgba(0,0,0), -1px -1px 0px rgba(0,0,0), inset .5px .5px 3px rgb(202, 255, 159), inset -.5px -.5px 3px rgb(202, 255, 159)"
      : "1px 1px 2px rgba(0,0,0,0), -1px -1px 1px rgba(0,0,0), inset 0px 0px 1px rgba(0,0,0), inset -1px -1px 5px rgba(0,0,0)",
    transition: { duration: 0.1, type: "tween" },
  }),
};

const TaskListTaskStatus = ({
  dueDate,
  editing,
  handleEdit,
  handleDelete,
  handleComplete,
  complete,
  ...props
}: TaskListTaskStatusPropsType): ReactElement => {
  const { dirty, setValues, initialValues } = props;
  const { fetching } = useSelector(taskListSelector);

  const buttonStyle = {
    background: colors.buttonGradients[0],
    boxShadow:
      "1px 1px 5px rgba(0,0,0,.1), -1px -1px 1px rgba(0,0,0,0), inset 1px 1px 1px rgba(0,0,0,.1), inset -1px -1px 1px rgba(0,0,0)",
    outline: "1px solid rgb(224, 220, 217,0)",
    fontFamily: fonts.jura,
    letterSpacing: ".5px",
  };

  return (
    <motion.div
      style={{
        background: colors.blackGradient[0],
        padding: "0px",
        outline: "1px solid rgb(224, 220, 217,0)",
        justifyContent: !dueDate && editing ? "end" : "space-between",
      }}
      custom={editing}
      variants={containerVariants}
      animate="animate"
      className="relative flex items-center justify-between min-h-[29px] rounded-xl"
    >
      <TaskListTaskStatusPopout
        editing={editing}
        complete={complete}
        dueDate={dueDate}
      />
      <motion.div
        animate={{
          gap: "8px",
          maxWidth: editing ? "85px" : "90px",
          justifyContent: complete ? "end" : "normal",
        }}
        className="w-full gap-1 flex max-w-[85px]"
      >
        {editing ? (
          <div className="flex items-center gap-[1px]">
            <Button
              style={{ ...buttonStyle, boxShadow: "0px" }}
              icon={<i className="fa-solid fa-arrow-rotate-left" />}
              disabled={fetching}
              onClick={async () => {
                await setValues(initialValues);
                handleEdit(true);
              }}
              className="cursor-pointer disabled:cursor-default disabled:text-slate-500 text-sm text-white p-1"
            />

            <Button
              type="button"
              style={buttonStyle}
              disabled={!dirty || fetching}
              onClick={() => handleEdit()}
              className="cursor-pointer disabled:cursor-default disabled:text-slate-500 text-sm text-white p-1 rounded-lg"
            >
              Submit
            </Button>
          </div>
        ) : (
          <>
            {!complete && (
              <Button
                type="button"
                style={buttonStyle}
                variants={buttonVariants}
                whileHover="hovered"
                whileTap="tapped"
                custom={editing}
                disabled={fetching}
                animate="animate"
                onClick={() => handleEdit()}
                className="cursor-pointer px-1 py-[2px] rounded-lg"
              >
                <SmallIcon
                  style={{ color: "black", y: 0 }}
                  animate={{
                    color: "black",
                  }}
                  size={16}
                  icon="fa-regular fa-pen-to-square"
                />
              </Button>
            )}
            <Button
              style={buttonStyle}
              variants={buttonVariants}
              whileHover="hovered"
              whileTap="tapped"
              custom={editing}
              disabled={fetching}
              type="button"
              onClick={() => handleDelete()}
              animate="animate"
              className="cursor-pointer flex items-center justify-center px-1 py-[2px] rounded-lg"
            >
              <SmallIcon
                style={{ y: 0 }}
                size={20}
                icon="fa-solid fa-xmark"
                className="relative text-red-500  text-lg"
              />
            </Button>
            {!complete && (
              <Button
                type="button"
                style={buttonStyle}
                variants={buttonVariants}
                whileHover="hovered"
                whileTap="tapped"
                custom={editing}
                disabled={fetching}
                onClick={() => handleComplete()}
                animate="animate"
                className="cursor-pointer px-1 py-[2px] rounded-lg"
              >
                <SmallIcon
                  style={{ color: "green", y: 0 }}
                  animate={{
                    color: "green",
                  }}
                  size={16}
                  icon="fa-solid fa-check"
                />
              </Button>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TaskListTaskStatus;
