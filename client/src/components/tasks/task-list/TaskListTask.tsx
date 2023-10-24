import dayjs, { Dayjs } from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { colors, fonts } from "../../../constants";
import { taskStatus } from "../../../functions/taskStatus";
import "../../../styles/mui-overrides/task.css";
import { TaskType } from "../../../types";
import ButtonPopout from "../../ButtonPopout";
import Calendar from "../../Calendar";
import ModalBackground from "../../ModalBackground";
import SmallIcon from "../../SmallIcon";
import ToggleSwitch from "../../ToggleSwitch";

type TaskListTaskPropsType = {
  task: TaskType;
  index: number;
};

const TaskListTask = ({ task, index }: TaskListTaskPropsType): ReactElement => {
  const [editing, setEditing] = useState(false);
  const [publicVisibility, setPublicVisibility] = useState(false);
  const [dueDate, setDueDate] = useState(dayjs().add(1, "hour"));
  const [taskValue, setTaskValue] = useState(task.task);

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
        animate={{
          bottom: editing ? "0px" : "-18px",
          height: editing ? "101%" : "130%",
        }}
        style={{
          borderRadius: "20px",
          bottom: "-18px",
          height: "130%",
          left: "-2px",
          background: `conic-gradient( 
          ${colors.purple} 20%,
          blue 20% 40%,
          ${colors.yellow} 40% 60%,
          ${colors.purple} 60% 80%,
          blue 80%
        )`,
          boxShadow: "1px 1px 5px rgba(0,0,0), -1px -1px 5px rgb(0,0,0)",
        }}
        className="absolute w-[102%] -z-[5]"
      />
      <motion.div
        layoutDependency={editing}
        layoutId={`edit-overlay-${index}`}
        style={{
          borderRadius: "20px",
          bottom: editing ? "0" : "-18px",
          left: "-2px",
          height: editing ? "101%" : "130%",
          background: !editing ? `rgb(0,0,0,.3)` : `rgb(0,0,0,0)`,
        }}
        className="absolute w-[102%] -z-[4]"
      />
    </>
  );

  return (
    <>
      {editing && (
        <ModalBackground
          background="rgba(0,0,0,.2)"
          mixBlendMode="color-burn"
          onClick={() => setEditing(false)}
        />
      )}
      <motion.div
        animate={{ scale: editing ? 1.2 : 1 }}
        onClick={() => setEditing((prev) => !prev)}
        style={{
          zIndex: editing ? 10 : "initial",
          gap: editing ? "16px" : "32px",
        }}
        className="relative flex flex-col p-4 max-w-[230px] rounded-3xl w-full"
      >
        {editing && renderEditPill}
        <motion.div
          className="relative rounded-xl"
          style={{
            outline: `1px solid rgb(70,70,70)`,
            padding: "0 12px",
          }}
        >
          {renderStatus()}
        </motion.div>
        <motion.div
          animate={{
            padding: editing ? "0 0px" : "0 12px",
          }}
          style={{ padding: "0 12px" }}
          className="relative flex flex-col gap-4"
        >
          {!editing && renderEditPill}
          <motion.div layout layoutDependency={editing} className="py-1">
            <motion.textarea
              value={taskValue}
              style={{
                outline: `2px solid rgb(180,180,180)`,
                borderBottom: "none",
                fontFamily: fonts.jura,
                boxShadow: `inset 1px 1px 10px rgb(80,80,80), inset -1px -1px 10px rgb(80,80,80)`,
                cursor: editing ? "text" : "default",
              }}
              onChange={({ target }) => setTaskValue(target.value)}
              disabled={!editing}
              className="paper relative resize-none text-sm px-3 w-full rounded-xl max-w-full"
            />
          </motion.div>
          <AnimatePresence mode="wait">
            {editing && (
              <motion.div
                className="relative"
                initial={{ position: "absolute", opacity: 0 }}
                animate={{ position: "relative", opacity: 1 }}
                exit={{
                  opacity: 0,
                  height: "0px",
                }}
              >
                <motion.div className="absolute h-[115%] w-full bottom-1 -z-[3] left-0" />
                <Calendar setDate={() => setDueDate} />
              </motion.div>
            )}
          </AnimatePresence>
          <div
            style={{
              background: editing
                ? `linear-gradient(to right, rgb(30,30,30), rgb(10,10,10), rgb(30,30,30))`
                : `linear-gradient(to right, rgb(0,0,0), rgb(0,0,0), rgb(0,0,0))`,
              outline: editing
                ? "rgb(180, 180, 180) solid 1px"
                : "1px solid rgb(255,255,255,0)",
            }}
            className="task-toggle isolate relative w-full p-1 rounded-xl ms-auto"
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
    </>
  );
};

export default TaskListTask;
