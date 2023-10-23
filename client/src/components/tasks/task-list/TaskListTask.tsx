import dayjs, { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { colors, fonts } from "../../../constants";
import { taskStatus } from "../../../functions/taskStatus";
import { TaskType } from "../../../types";
import ButtonPopout from "../../ButtonPopout";
import SmallIcon from "../../SmallIcon";
import ToggleSwitch from "../../ToggleSwitch";

type TaskListTaskPropsType = {
  task: TaskType;
  index: number;
};

const TaskListTask = ({ task, index }: TaskListTaskPropsType): ReactElement => {
  const [editing, setEditing] = useState(false);
  const [publicVisibility, setPublicVisibility] = useState(false);

  const handleToggle = () => setPublicVisibility((prev) => !prev);

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

  const renderEditPill = (
    <>
      <motion.div
        layoutDependency={editing}
        layoutId={`edit-pill-${index}`}
        style={{
          borderRadius: "20px",
          bottom: editing ? "0" : "-10px",
          left: "0px",
          height: editing ? "105%" : "130%",
          background: `conic-gradient( 
          ${colors.purple} 20%,
          blue 20% 40%,
          ${colors.yellow} 40% 60%,
          ${colors.purple} 60% 80%,
          blue 80%
        )`,
        }}
        className="absolute w-full -z-[5]"
      />
      <motion.div
        layoutDependency={editing}
        layoutId={`edit-overlay-${index}`}
        style={{
          borderRadius: "20px",
          bottom: editing ? "0" : "-10px",
          left: "0px",
          height: editing ? "105%" : "130%",
          background: editing ? `rgb(0,0,0,.5)` : `rgb(0,0,0, 0)`,
        }}
        className="absolute w-full -z-[4]"
      />
    </>
  );

  return (
    <motion.div
      onClick={() => setEditing((prev) => !prev)}
      className="relative flex flex-col gap-9 max-w-[230px] rounded-3xl w-full p-2"
    >
      {editing && renderEditPill}
      <motion.div
        className="p-1  relative rounded-xl"
        style={{
          outline: `1px solid rgb(70,70,70)`,
        }}
      >
        {renderStatus()}
      </motion.div>
      <motion.div
        animate={{
          padding: editing ? "0 10px" : "0 12px",
        }}
        style={{ padding: "0 12px" }}
        className="relative"
      >
        {!editing && renderEditPill}
        <div className="py-3">
          <textarea
            value={task.task}
            style={{
              outline: `1px solid rgb(70,70,70)`,
              borderBottom: "none",
              fontFamily: fonts.exo,
              boxShadow: `inset 1px 1px 10px rgb(80,80,80), inset -1px -1px 10px rgb(80,80,80)`,
            }}
            className="paper relative resize-none text-sm px-3 w-full rounded-xl max-w-full"
          />
        </div>
        <div
          style={{
            background: `linear-gradient(to right, rgb(0,0,0), rgb(30,30,30))`,
          }}
          className="task-toggle relative w-3/4 p-1 rounded-xl ms-auto"
        >
          <ToggleSwitch
            disabled={!editing}
            label={publicVisibility ? "Public" : "Private"}
            handleToggle={handleToggle}
            toggled={publicVisibility}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskListTask;
