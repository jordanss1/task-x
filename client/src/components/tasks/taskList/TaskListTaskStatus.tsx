import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors } from "../../../constants";
import Button from "../../Button";
import SmallIcon from "../../SmallIcon";
import TaskListTaskStatusPopout from "./TaskListTaskStatusPopout";

type TaskListTaskStatusPropsType = {
  dueDate: Date | undefined;
  editing: boolean;
  handleEdit: () => void;
};

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
}: TaskListTaskStatusPropsType): ReactElement => {
  const buttonStyle = {
    background: colors.buttonGradients[0],
    boxShadow:
      "1px 1px 5px rgba(0,0,0,.1), -1px -1px 1px rgba(0,0,0,0), inset 1px 1px 1px rgba(0,0,0,.1), inset -1px -1px 1px rgba(0,0,0)",
    outline: "1px solid rgb(224, 220, 217,0)",
  };

  return (
    <motion.div
      style={{
        background: colors.blackGradient[0],
        padding: "0px",
        outline: "1px solid rgb(224, 220, 217,0)",
      }}
      custom={editing}
      variants={containerVariants}
      animate="animate"
      className="relative flex items-center justify-between min-h-[29px] rounded-xl"
    >
      <TaskListTaskStatusPopout editing={editing} dueDate={dueDate} />
      <motion.div
        animate={{
          gap: editing ? "13px" : "8px",
          maxWidth: editing ? "70px" : "60px",
        }}
        className="w-full gap-2 flex max-w-[60px]"
      >
        <Button
          style={buttonStyle}
          variants={buttonVariants}
          whileHover="hovered"
          whileTap="tapped"
          custom={editing}
          animate="animate"
          onClick={() => handleEdit()}
          className="cursor-pointer px-1 py-[2px] rounded-lg"
        >
          <SmallIcon
            style={{ color: "black", y: 0 }}
            animate={{
              color: editing ? "#36cb62" : "black",
            }}
            size={editing ? 19 : 16}
            icon={`${
              editing ? "fa-solid fa-check" : "fa-regular fa-pen-to-square"
            }`}
          />
        </Button>
        <Button
          style={buttonStyle}
          variants={buttonVariants}
          whileHover="hovered"
          whileTap="tapped"
          custom={editing}
          animate="animate"
          className="cursor-pointer flex items-center justify-center px-1 py-[2px] rounded-lg"
        >
          <SmallIcon
            style={{ y: 0 }}
            size={editing ? 22 : 20}
            icon="fa-solid fa-xmark"
            className="relative text-red-500  text-lg"
          />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TaskListTaskStatus;
