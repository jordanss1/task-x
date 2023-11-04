import dayjs from "dayjs";
import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import { taskStatus } from "../../../functions/taskStatus";
import ButtonPopout from "../../ButtonPopout";
import SmallIcon from "../../SmallIcon";

type TaskListTaskStatusPopoutPropsType = {
  editing: boolean;
  dueDate: Date | undefined;
};

const popoutVariants: Variants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 0.8, scale: 1, transition: { ease: "easeIn" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } },
};

const TaskListTaskStatusPopout = ({
  editing,
  dueDate,
}: TaskListTaskStatusPopoutPropsType): ReactElement => {
  const { taskIsOverdue, timeLeft, timeFormat, noDueDate } = taskStatus(
    dueDate ? dayjs(dueDate) : undefined
  );

  const renderDueLabel = (
    <span className="underline underline-offset-4 decoration-black">
      <motion.i
        animate={{
          color: taskIsOverdue
            ? "red"
            : editing && !taskIsOverdue
            ? colors.whiteShades[2]
            : "rgb(0,0,0)",
        }}
        className="fa-solid fa-clock text-[rgb(0,0,0)] relative top-[2px] pe-1"
      />
      <motion.span
        animate={{
          color: editing ? colors.whiteShades[2] : "rgb(0,0,0)",
          fontSize: editing ? "12px" : "14px",
        }}
        className="text-[rgb(0,0,0)]"
      >
        <span
          style={{
            fontFamily: taskIsOverdue ? fonts.jura : fonts.orbitron,
          }}
          className="font-semibold text-sm"
        >
          {taskIsOverdue ? "Overdue" : timeLeft}
        </span>{" "}
        {!taskIsOverdue && (
          <span style={{ fontFamily: fonts.jura }}>{timeFormat}</span>
        )}
      </motion.span>
    </span>
  );

  if (noDueDate) {
    return (
      <ButtonPopout
        style={{
          fontFamily: fonts.jura,
          color: "rgb(0,0,0)",
        }}
        animate={{
          background: editing ? "rgb(0,0,0,0)" : "rgb(255,255,255, 0)",
          color: editing ? colors.whiteShades[2] : "rgb(0,0,0)",
        }}
        whileHover={{
          background: editing ? "rgb(0, 0, 0, 0)" : "rgb(180,180,180)",
          transition: { duration: 0.2 },
        }}
        className="gap-1 p-1 px-2 rounded-lg underline underline-offset-4 bg-transparent decoration-black"
        action="hover"
        fontSize={14}
        label="Not due"
        icon={
          <SmallIcon
            style={{
              color: "rgb(0,0,0)",
            }}
            animate={{
              color: editing ? colors.whiteShades[2] : "rgb(0,0,0)",
            }}
            size={14}
            className="relative ps-1 bottom-[1px] font-extrabold"
            icon="fa-solid fa-info"
          />
        }
      >
        <motion.div
          variants={popoutVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute p-1 w-32 bottom-[35px] cursor-default origin-bottom-right h-fit right-0  border-[1px] font-[jura] rounded-lg overflow-hidden text-xs bg-[#f4f0ed] border-slate-400 text-slate-600 opacity-80"
        >
          You can set due date using the edit button
        </motion.div>
      </ButtonPopout>
    );
  } else {
    return (
      <ButtonPopout
        animate={{
          background: editing ? "rgb(0,0,0,0)" : "rgb(255,255,255, 0)",
        }}
        whileHover={{
          background: editing ? "rgb(0, 0, 0, 0)" : "rgb(180,180,180)",
          transition: { duration: 0.2 },
        }}
        className="gap-1 p-1 px-2 font-[jura] rounded-lg bg-transparent"
        action="hover"
        fontSize={editing ? 12 : 14}
        icon={""}
        label={renderDueLabel}
      >
        <motion.div
          style={{
            fontFamily: fonts.jura,
            fontSize: editing ? "12px" : "14px",
          }}
          variants={popoutVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute p-2 w-40 bottom-[38px] cursor-default origin-bottom-right h-fit right-0 border-[1px] rounded-lg overflow-hidden text-sm bg-[#f4f0ed] border-slate-400 text-slate-600 opacity-80"
        >
          {dayjs(dueDate).format("DD/MM/YYYY HH:mm")}
        </motion.div>
      </ButtonPopout>
    );
  }
};

export default TaskListTaskStatusPopout;
