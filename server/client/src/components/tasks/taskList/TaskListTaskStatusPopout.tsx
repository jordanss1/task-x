import dayjs from "dayjs";
import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts, popoutVariants } from "../../../constants";
import { taskStatus } from "../../../functions/taskStatus";
import ButtonPopout from "../../__reusable/ButtonPopout";
import SmallIcon from "../../__reusable/SmallIcon";

type TaskListTaskStatusPopoutPropsType = {
  editing: boolean;
  dueDate: string | undefined;
  complete: boolean;
};

const TaskListTaskStatusPopout = ({
  editing,
  dueDate,
  complete,
}: TaskListTaskStatusPopoutPropsType): ReactElement => {
  const { taskIsOverdue, timeLeft, timeFormat, noDueDate } = taskStatus(
    dueDate ? dayjs(dueDate) : undefined
  );

  const renderDueLabel = (
    <span className="underline underline-offset-4 decoration-black">
      {!complete && (
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
      )}
      <motion.span
        animate={{
          color: editing ? colors.whiteShades[2] : "rgb(0,0,0)",
          fontSize: editing ? "12px" : "14px",
        }}
        className="text-[rgb(0,0,0)]"
      >
        {!complete && (
          <span
            style={{
              fontFamily: taskIsOverdue ? fonts.jura : fonts.orbitron,
            }}
            className="font-semibold text-sm"
          >
            {taskIsOverdue ? "Overdue" : timeLeft}{" "}
          </span>
        )}
        {!taskIsOverdue && (
          <span style={{ fontFamily: fonts.jura }}>
            {!complete && timeFormat}
          </span>
        )}
      </motion.span>
    </span>
  );

  if (noDueDate) {
    return (
      <ButtonPopout
        type="button"
        style={{
          fontFamily: fonts.jura,
          color: "rgb(0,0,0)",
          cursor: complete ? "initial" : "pointer",
          display: editing ? "none" : "flex",
        }}
        animate={{
          background: editing ? "rgb(0,0,0,0)" : "rgb(255,255,255, 0)",
          color: editing ? colors.whiteShades[2] : "rgb(0,0,0)",
        }}
        whileHover={{
          background:
            editing || complete ? "rgb(0, 0, 0, 0)" : "rgb(180,180,180)",
          transition: { duration: 0.2 },
        }}
        className="gap-1 p-1 ms-1 px-2 rounded-lg underline underline-offset-4 bg-transparent decoration-black"
        action="hover"
        label={<></>}
        icon={
          !complete && (
            <SmallIcon
              style={{
                color: "rgb(0,0,0)",
              }}
              animate={{
                color: editing ? colors.whiteShades[2] : "rgb(0,0,0)",
              }}
              size={14}
              className="relative text-center bottom-[1px] font-extrabold"
              icon="fa-solid fa-info"
            />
          )
        }
      >
        {!editing && !complete && (
          <motion.div
            variants={popoutVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute p-1 w-32 z-30 bottom-[35px] cursor-default origin-bottom-right h-fit right-0  border-[1px] font-[jura] rounded-lg overflow-hidden text-xs bg-[#f4f0ed] border-slate-400 text-slate-600 opacity-80"
          >
            You can set due date using the edit button
          </motion.div>
        )}
      </ButtonPopout>
    );
  } else {
    return (
      <ButtonPopout
        type="button"
        animate={{
          background: editing ? "rgb(0,0,0,0)" : "rgb(255,255,255, 0)",
        }}
        whileHover={{
          background:
            editing || complete ? "rgb(0, 0, 0, 0)" : "rgb(180,180,180)",
          transition: { duration: 0.2 },
        }}
        style={{
          cursor: complete ? "initial" : "pointer",
        }}
        className="gap-2 whitespace-nowrap p-1 px-2 font-[jura] rounded-lg bg-transparent"
        action="hover"
        fontSize={editing ? 12 : 14}
        icon={""}
        label={renderDueLabel}
      >
        {!complete && (
          <motion.div
            style={{
              fontFamily: fonts.jura,
              fontSize: editing ? "12px" : "14px",
            }}
            variants={popoutVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute p-2 w-40 bottom-[38px] z-30 cursor-default origin-bottom-right h-fit right-0 border-[1px] rounded-lg overflow-hidden text-sm bg-[#f4f0ed] border-slate-400 text-slate-600 opacity-80"
          >
            {dayjs(dueDate).format("DD/MM/YYYY HH:mm")}
          </motion.div>
        )}
      </ButtonPopout>
    );
  }
};

export default TaskListTaskStatusPopout;
