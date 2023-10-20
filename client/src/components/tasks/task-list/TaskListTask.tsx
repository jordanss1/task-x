import dayjs, { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import { taskStatus } from "../../../functions/taskStatus";
import { TaskType } from "../../../types";
import ButtonPopout from "../../ButtonPopout";
import SmallIcon from "../../SmallIcon";

type TaskListTaskPropsType = {
  task: TaskType;
};

const TaskListTask = ({ task }: TaskListTaskPropsType): ReactElement => {
  const { taskIsOverdue, timeFormat, notDue } = taskStatus(task.dueBy);

  const renderStatus = () => {
    if (notDue) {
      return (
        <ButtonPopout
          className="gap-1 p-1 rounded-lg outline-1 outline outline-slate-500"
          action="hover"
          label="Not due"
          icon={<SmallIcon size={10} icon="fa-solid fa-info" />}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.8, scale: 1, transition: { ease: "easeIn" } }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
            className="absolute p-1 w-32 bottom-[35px] cursor-default origin-bottom-right h-fit right-0  border-[1px] rounded-lg overflow-hidden text-xs bg-[#f4f0ed] border-slate-400"
          >
            You can set due date using the edit button
          </motion.div>
        </ButtonPopout>
      );
    }

    if (taskIsOverdue) {
      return (
        <span>
          Due in <span>{task.dueBy?.diff(dayjs(), "hours")}</span>
        </span>
      );
    } else {
      return (
        <span>
          Due in <span>{task.dueBy?.diff(dayjs(), "hours")}</span>
        </span>
      );
    }
  };

  return (
    <motion.div
      style={{
        background: `linear-gradient(120deg, ${colors.whiteShades[0]}, ${colors.whiteShades[1]})`,
        outline: `1px solid rgb(160,160,160)`,
        boxShadow:
          "1px 1px 1px rgb(160,160,160), -1px -1px 10px rgb(160,160,160)",
      }}
      className="py-4 relative max-w-[230px] rounded-3xl w-full min-h-[260px] p-2 items-center justify-center"
    >
      <div>{renderStatus()}</div>
      <textarea
        value={task.task}
        style={{
          outline: `1px solid rgb(160,160,160)`,
          borderBottom: "none",
          fontFamily: fonts.exo,
        }}
        className="paper resize-none text-xs px-2 w-full rounded-xl max-w-full"
      />
    </motion.div>
  );
};

export default TaskListTask;
