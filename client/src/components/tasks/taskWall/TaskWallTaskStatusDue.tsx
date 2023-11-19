import dayjs from "dayjs";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import { fonts, popoutVariants } from "../../../constants";
import { taskStatus } from "../../../functions/taskStatus";
import ButtonPopout from "../../ButtonPopout";

const TaskWallTaskStatusDue = ({
  dueDate,
}: {
  dueDate: Date | undefined;
}): ReactElement => {
  const { noDueDate, taskIsOverdue } = taskStatus(dayjs(dueDate));

  const renderPopout = noDueDate
    ? "Freeflow"
    : taskIsOverdue
    ? "Overdue: Give them motivation!"
    : taskIsOverdue === false
    ? "Due soon: Inspire them"
    : "";

  const label = noDueDate
    ? "Freeflow"
    : taskIsOverdue
    ? "Procrastinator"
    : taskIsOverdue === false
    ? "In the clear"
    : "";

  return (
    <ButtonPopout
      icon=""
      style={{
        background: taskIsOverdue ? "red" : "green",
        fontFamily: fonts.orbitron,
      }}
      className="rounded-xl p-2 text-xs text-slate-200"
      action="hover"
      label={label}
    >
      <motion.div
        variants={popoutVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ fontFamily: fonts.orbitron }}
        className="absolute z-[5] whitespace-nowrap bottom-[40px] cursor-default origin-bottom -left-[50%] p-1 border-[1px] text-xs  rounded-lg overflow-hidden bg-[#f4f0ed] text-black border-slate-400"
      >
        {renderPopout}
      </motion.div>
    </ButtonPopout>
  );
};

export default TaskWallTaskStatusDue;
