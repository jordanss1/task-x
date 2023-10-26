import { Dayjs } from "dayjs";
import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors } from "../../../constants";
import Button from "../../Button";
import SmallIcon from "../../SmallIcon";
import TaskStatusPopout from "./TaskStatusPopout";

type TaskStatusPropsType = {
  dueBy: Dayjs | undefined;
  editing: boolean;
  handleEdit: () => void;
};

const containerVariants: Variants = {
  animate: (editing: boolean) => ({
    background: editing
      ? `linear-gradient(to right, rgb(30,30,30), rgb(10,10,10), rgb(30,30,30))`
      : `linear-gradient(to right, rgb(30,30,30,0), rgb(10,10,10,0), rgb(30,30,30,0))`,
    outline: editing
      ? "1px solid rgb(224, 220, 217)"
      : "1px solid rgb(224, 220, 217,0)",
    padding: editing ? "5px" : "0px",
  }),
};

const buttonVariants: Variants = {
  animate: (editing: boolean) => ({
    background: editing ? colors.buttonGradient[1] : colors.buttonGradient[0],
    boxShadow: editing
      ? "inset 3px 3px 1px #18181840, inset -3px -3px 6px #18181840"
      : "inset 3px 3px 3px rgba(255, 255, 255, 0), inset -3px -3px 1px rgba(0, 0, 0, 0)",
    outline: editing
      ? "1px solid rgb(224, 220, 217)"
      : "1px solid rgb(224, 220, 217,0)",
  }),
};

const TaskStatus = ({
  dueBy,
  editing,
  handleEdit,
}: TaskStatusPropsType): ReactElement => {
  const buttonStyle = {
    background: colors.buttonGradient[0],
    boxShadow:
      "inset 3px 3px 3px rgba(255, 255, 255, 0), inset -3px -3px 6px rgba(0, 0, 0, 0)",
    outline: "1px solid rgb(224, 220, 217,0)",
  };

  console.log(editing);

  return (
    <motion.div
      style={{
        background: `linear-gradient(to right, rgb(30,30,30,0), rgb(10,10,10,0), rgb(30,30,30,0))`,
        padding: "0px",
        outline: "1px solid rgb(224, 220, 217,0)",
      }}
      custom={editing}
      variants={containerVariants}
      animate="animate"
      className="relative flex items-center justify-between min-h-[29px] rounded-xl"
    >
      <TaskStatusPopout editing={editing} dueBy={dueBy} />
      <motion.div
        animate={{
          gap: editing ? "13px" : "8px",
          maxWidth: editing ? "70px" : "50px",
        }}
        className="w-full gap-2 flex max-w-[50px]"
      >
        <Button
          style={buttonStyle}
          variants={buttonVariants}
          custom={editing}
          animate="animate"
          onClick={() => handleEdit()}
          className="cursor-pointer px-1 py-[2px] rounded-lg"
        >
          <SmallIcon
            style={{ color: "black" }}
            animate={{ color: editing ? "green" : "black" }}
            size={editing ? 19 : 16}
            icon={`${
              editing ? "fa-solid fa-check" : "fa-regular fa-pen-to-square"
            }`}
          />
        </Button>
        <Button
          style={buttonStyle}
          variants={buttonVariants}
          custom={editing}
          animate="animate"
          className="cursor-pointer flex items-center justify-center px-1 py-[2px] rounded-lg"
        >
          <SmallIcon
            size={editing ? 22 : 20}
            icon="fa-solid fa-xmark"
            className="relative text-red-500 top-[1px] text-lg"
          />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TaskStatus;
