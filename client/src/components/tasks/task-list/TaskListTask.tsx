import dayjs, { Dayjs } from "dayjs";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { colors, fonts } from "../../../constants";
import { taskStatus } from "../../../functions/taskStatus";
import "../../../styles/mui-overrides/task.css";
import { TaskType } from "../../../types";
import ButtonPopout from "../../ButtonPopout";
import Calendar from "../../Calendar";
import ModalBackground from "../../ModalBackground";
import SmallIcon from "../../SmallIcon";
import ToggleSwitch from "../../ToggleSwitch";
import TaskOverlay from "./TaskOverlay";
import TaskStatus from "./TaskStatus";

type TaskListTaskPropsType = {
  task: TaskType;
  index: number;
};

const TaskListTask = ({ task, index }: TaskListTaskPropsType): ReactElement => {
  const [editing, setEditing] = useState(false);
  const [publicVisibility, setPublicVisibility] = useState(false);
  const [dueDate, setDueDate] = useState(dayjs().add(1, "hour"));
  const [taskValue, setTaskValue] = useState(task.task);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (editing) {
      animate(
        scope.current,
        {
          background: [
            `conic-gradient( 
            ${colors.purple} -50%,
            rgb(0, 0, 255) -20% -40%,
            ${colors.yellow} -40% -60%,
            ${colors.purple} -60% -80%,
            rgb(0, 0, 255) -80%
          )`,
            `conic-gradient( 
            ${colors.purple} 20%,
            rgb(0, 0, 255) 20% 40%,
            ${colors.yellow} 40% 60%,
            ${colors.purple} 60% 80%,
            rgb(0, 0, 255) 80%
          )`,
          ],
        },
        { type: "spring", stiffness: 70 }
      );
    }
  }, [editing]);

  const handleEdit = async () => {
    if (!editing) {
      await animate(
        scope.current,
        {
          background: [
            `conic-gradient( 
          ${colors.purple} 20%,
          rgb(0, 0, 255) 20% 40%,
          ${colors.yellow} 40% 60%,
          ${colors.purple} 60% 80%,
          rgb(0, 0, 255) 80%
        `,
            `conic-gradient( 
            ${colors.purple} 100%,
            rgb(0, 0, 255) 20% 40%,
            ${colors.yellow} 40% 60%,
            ${colors.purple} 60% 80%,
            rgb(0, 0, 255) 80%
          )`,
          ],
        },
        { duration: 0.3, type: "tween", ease: "easeIn" }
      );

      setEditing(true);
    } else setEditing(false);
  };

  const handleToggle = editing
    ? () => setPublicVisibility((prev) => !prev)
    : () => {};

  return (
    <>
      <AnimatePresence mode="wait">
        {editing && (
          <ModalBackground
            key={1}
            mixBlendMode="normal"
            background="rgba(0,0,0,.2)"
            onClick={() => setEditing(false)}
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={{
          scale: editing ? 1.2 : 1,
          gap: editing ? "16px" : "32px",
          zIndex: editing ? 10 : "initial",
          transition: { ease: "easeIn" },
        }}
        style={{
          scale: 1,
        }}
        className="relative gap-8 flex flex-col p-4 max-w-[230px] rounded-3xl w-full"
      >
        {editing && (
          <TaskOverlay index={index} editing={editing} scope={scope} />
        )}
        <TaskStatus
          editing={editing}
          handleEdit={handleEdit}
          dueBy={task.dueBy}
        />
        <motion.div
          animate={{
            padding: editing ? "0 0px" : "0 12px",
          }}
          style={{ padding: "0 12px" }}
          className="relative flex flex-col gap-4"
        >
          {!editing && (
            <TaskOverlay index={index} editing={editing} scope={scope} />
          )}
          <motion.div layout layoutDependency={editing} className="py-1">
            <textarea
              value={taskValue}
              style={{
                outline: `2px solid rgb(180,180,180)`,
                fontFamily: fonts.jura,
                boxShadow: `inset 1px 1px 10px rgb(80,80,80), inset -1px -1px 10px rgb(80,80,80)`,
                cursor: editing ? "text" : "default",
              }}
              onChange={({ target }) => setTaskValue(target.value)}
              disabled={!editing}
              className="paper border-b-0 relative resize-none text-sm px-3 w-full rounded-xl max-w-full"
            />
          </motion.div>
          <AnimatePresence mode="wait">
            {editing && (
              <motion.div
                className="relative"
                initial={{ position: "absolute", opacity: 0 }}
                animate={{
                  position: "relative",
                  opacity: 1,
                }}
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
          <motion.div
            animate={{
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
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default TaskListTask;
