import dayjs from "dayjs";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import { fonts, popoutVariants } from "../../../../constants";
import { taskStatus } from "../../../../functions/taskStatus";
import ButtonPopout from "../../../__reusable/ButtonPopout";
import SmallIcon from "../../../__reusable/SmallIcon";

const TaskWallTaskStatusDue = ({
  dueDate,
  mobile,
}: {
  dueDate: Date | undefined;
  mobile: boolean;
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

  const icon = noDueDate ? (
    <SmallIcon icon="fa-solid fa-check" />
  ) : (
    <SmallIcon icon="fa-solid fa-clock" />
  );

  return (
    <ButtonPopout
      icon={mobile ? icon : ""}
      style={{
        background: taskIsOverdue ? "red" : "green",
        fontFamily: fonts.orbitron,
      }}
      fontSize={mobile ? 10 : 12}
      className="rounded-xl p-2 sm:h-auto h-7  flex justify-center items-center text-slate-200"
      action="hover"
      label={mobile ? "" : label}
    >
      <motion.div
        variants={popoutVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ fontFamily: fonts.orbitron }}
        className="absolute z-[5] whitespace-nowrap bottom-[40px] cursor-default origin-bottom -left-[325%] sm:-left-[50%] p-1 border-[1px] text-[10px] sm:text-xs rounded-lg overflow-hidden bg-[#f4f0ed] text-black border-slate-400"
      >
        {renderPopout}
      </motion.div>
    </ButtonPopout>
  );
};

export default TaskWallTaskStatusDue;
