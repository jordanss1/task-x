import { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import { TaskType } from "../../../types";

type TaskListTaskPropsType = {
  task: TaskType;
};

const TaskListTask = ({ task }: TaskListTaskPropsType): ReactElement => {
  return (
    <motion.div
      style={{
        background: `linear-gradient(120deg, ${colors.whiteShades[0]}, ${colors.whiteShades[1]})`,
        outline: `1px solid rgb(160,160,160)`,
        boxShadow:
          "1px 1px 1px rgb(160,160,160), -1px -1px 10px rgb(160,160,160)",
      }}
      className="py-4 max-w-[230px] rounded-3xl w-full min-h-[260px] p-2 items-center justify-center"
    >
      <textarea
        style={{
          outline: `1px solid rgb(160,160,160)`,
          borderBottom: "none",
          fontFamily: fonts.exo,
        }}
        disabled
        className="paper resize-none text-xs px-2 w-full rounded-xl max-w-full"
      >
        {task.task}
      </textarea>
    </motion.div>
  );
};

export default TaskListTask;
