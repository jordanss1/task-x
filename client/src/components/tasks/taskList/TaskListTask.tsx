import dayjs from "dayjs";
import { AnimatePresence, Variants, motion, useAnimate } from "framer-motion";
import { ReactElement, useEffect, useRef, useState } from "react";
import { colors, fonts } from "../../../constants";
import "../../../styles/mui-overrides/task.css";
import { TaskType } from "../../../types";
import ModalBackground from "../../ModalBackground";
import ToggleSwitch from "../../ToggleSwitch";
import TasksCalender from "../TasksCalender";
import TaskListTaskOverlay from "./TaskListTaskOverlay";
import TaskListTaskStatus from "./TaskListTaskStatus";

type TaskListTaskPropsType = {
  taskItem: TaskType;
  index: number;
};

const toggleVariants: Variants = {
  animate: (editing) => ({
    background: editing
      ? colors.blackGradient[1]
      : `linear-gradient(to right, rgb(0,0,0), rgb(0,0,0), rgb(0,0,0))`,
    outline: editing
      ? "rgb(180, 180, 180) solid 1px"
      : "1px solid rgb(255,255,255,0)",
  }),
};

const TaskListTask = ({
  taskItem,
  index,
}: TaskListTaskPropsType): ReactElement => {
  const { task, taskDueEnabled, dueBy, created, onTaskWall } = taskItem;
  const [editing, setEditing] = useState(false);
  const [publicVisibility, setPublicVisibility] = useState(onTaskWall);
  const [dueDate, setDueDate] = useState(
    dueBy ? dueBy : dayjs().add(1, "hour")
  );
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [taskValue, setTaskValue] = useState(task);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (editing && inputRef.current) {
      const textInput = inputRef.current;

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

      const length = task.length;
      textInput?.setSelectionRange(length, length);
      textInput?.focus();
      inputRef.current.focus();
    }
  }, [editing]);

  const handleEdit = async () => {
    if (!editing && inputRef.current) {
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
          scale: editing ? "var(--scale-to)" : 1,
          gap: editing ? "16px" : "32px",
          zIndex: editing ? 10 : "initial",
          transition: { ease: "easeIn" },
        }}
        style={{
          scale: 1,
        }}
        className="relative gap-8 sm:[--scale-to:1.2] [--scale-to:1.1]  flex flex-col p-4 max-w-[230px] rounded-3xl w-full"
      >
        {editing && (
          <TaskListTaskOverlay index={index} editing={editing} scope={scope} />
        )}
        <TaskListTaskStatus
          editing={editing}
          handleEdit={handleEdit}
          dueBy={dueBy}
        />
        <motion.div
          animate={{
            padding: editing ? "0 0px" : "0 12px",
          }}
          style={{ padding: "0 12px" }}
          className="relative flex flex-col gap-4"
        >
          {!editing && (
            <TaskListTaskOverlay
              key="calender"
              index={index}
              editing={editing}
              scope={scope}
            />
          )}
          <motion.div layout layoutDependency={editing} className="py-1">
            <textarea
              ref={inputRef}
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
              <TasksCalender
                initial={{ position: "absolute", opacity: 0 }}
                animate={{
                  position: "relative",
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  height: "0px",
                }}
                style={{
                  outline: "rgb(180, 180, 180) solid 1px",
                  background: colors.blackGradient[1],
                }}
                className="flex min-h-[45px] relative isolate px-3 gap-3 rounded-xl  items-center"
                handleDate={setDueDate}
                taskDueEnabled={taskDueEnabled}
              />
            )}
          </AnimatePresence>
          <motion.div
            custom={editing}
            variants={toggleVariants}
            animate="animate"
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
