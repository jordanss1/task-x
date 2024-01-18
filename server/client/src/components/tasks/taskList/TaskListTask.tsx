import { Form, Formik, FormikConfig } from "formik";
import { AnimatePresence, Variants, motion, useAnimate } from "framer-motion";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AppThunkDispatch } from "../../../app/store";
import { colors, fonts } from "../../../constants";
import {
  completeTask,
  deleteTask,
  editTask,
  taskListSelector,
} from "../../../features/taskList/taskListSlice";
import { TaskSubmitSchemaType, taskSubmitSchema } from "../../../schemas";
import "../../../styles/mui-overrides/task.css";
import { TaskType, TaskWallTaskType } from "../../../types";
import ModalBackground from "../../__reusable/ModalBackground";
import Popup, { PopupPropsType } from "../../__reusable/Popup";
import TaskTextArea from "../../__reusable/TaskTextArea";
import ToggleSwitch from "../../__reusable/ToggleSwitch";
import TasksCalender from "../TasksCalender";
import TaskListTaskOverlay from "./TaskListTaskOverlay";
import TaskListTaskStatus from "./TaskListTaskStatus";

type TaskListTaskPropsType = {
  taskItem: TaskType;
  matchingUserWallTask: TaskWallTaskType | false;
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
  matchingUserWallTask,
}: TaskListTaskPropsType): ReactElement => {
  const {
    task,
    enabledDueDate,
    dueDate,
    onTaskWall,
    taskId,
    complete,
    created,
  } = taskItem;
  const dispatch = useDispatch<AppThunkDispatch>();
  const { taskListFetching } = useSelector(taskListSelector);

  const [prompt, setPrompt] = useState<PopupPropsType["prompt"]>();
  const [editing, setEditing] = useState(false);
  const [uuid, setUuid] = useState(uuidv4());
  const [overlayUuid, setOverlayUuid] = useState(uuidv4());

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [scope, animate] = useAnimate();

  const enterAnimation = async () => {
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
  };

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

  const handleSubmit: FormikConfig<TaskSubmitSchemaType>["onSubmit"] = async (
    values,
    actions
  ) => {
    await dispatch(
      editTask({
        ...values,
        taskId,
        complete,
        created,
      })
    );

    actions.resetForm({ values });
  };

  return (
    <Formik<TaskSubmitSchemaType>
      initialValues={{
        task,
        enabledDueDate,
        dueDate,
        onTaskWall,
      }}
      onSubmit={handleSubmit}
      validationSchema={taskSubmitSchema}
    >
      {(props) => {
        const { errors, values, initialValues, setValues } = props;

        const deletingTaskWallTask =
          !values.onTaskWall && initialValues.onTaskWall;

        const handleToggle = () => {
          if (editing) props.setFieldValue("onTaskWall", !values.onTaskWall);
        };

        const handleEdit = async (reset?: boolean) => {
          if (reset) {
            props.setTouched({ dueDate: undefined });
            setEditing(false);
            return;
          }

          if (!editing && inputRef.current) {
            await enterAnimation();
            setEditing(true);
            return;
          } else if (
            !Object.keys(errors).length &&
            editing &&
            deletingTaskWallTask
          ) {
            setPrompt({
              message: (
                <div className="flex flex-col gap-2 max-w-[240px] pb-1">
                  <span>
                    This will also delete your Task Wall task including all
                    awards, likes, and comments associated.
                  </span>
                  Are you sure?
                </div>
              ),
              onDeny: () => {
                setPrompt(undefined);
                handleEdit(false);
              },
              onAccept: async () => {
                await props.submitForm();
                setPrompt(undefined);
                props.setTouched({ dueDate: undefined });
                setEditing(false);
              },
            });
            return;
          } else if (!Object.keys(errors).length && editing) {
            await props.submitForm();
            props.setTouched({ dueDate: undefined });
            setEditing(false);
          }
        };

        const handleDelete = async () => {
          if (matchingUserWallTask) {
            setPrompt({
              message: (
                <div className="flex flex-col gap-2 max-w-[240px] pb-1">
                  <span>
                    This will also delete your Task Wall task including all
                    awards, likes, and comments associated.
                  </span>
                  {!complete && (
                    <span>
                      If you mark the task as complete you can keep these
                      things.
                    </span>
                  )}
                  Are you sure?
                </div>
              ),
              onDeny: () => setPrompt(undefined),
              onAccept: async () => {
                await dispatch(deleteTask(taskId));
                setPrompt(undefined);
              },
            });
            return;
          }

          dispatch(deleteTask(taskItem.taskId));
        };

        const handleComplete = async () => {
          setPrompt({
            message: (
              <div className="flex flex-col gap-2 max-w-[240px] pb-1">
                <span>
                  Completing this task will mean you can never edit it again.
                </span>
                Are you sure?
              </div>
            ),
            onAccept: async () => {
              await dispatch(completeTask(taskId));
              props.resetForm({ values });
              setPrompt(undefined);
            },
            onDeny: () => setPrompt(undefined),
          });
        };

        return (
          <Form>
            <AnimatePresence mode="wait">
              {prompt && <Popup key="prompt" prompt={prompt} />}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {(editing || taskListFetching) && (
                <div>
                  <ModalBackground
                    key={1}
                    animate={{
                      filter: taskListFetching ? "blur(5px)" : "blur(0px)",
                      scaleX: taskListFetching ? 0.97 : 1,
                      scaleY: taskListFetching ? 0.99 : 1,
                      transition: {
                        scale: { type: "tween", ease: "easeIn" },
                      },
                    }}
                    mixBlendMode="normal"
                    background={
                      taskListFetching ? "rgba(0,0,0,0)" : "rgba(0,0,0,.2)"
                    }
                    onClick={() => {
                      setValues(initialValues);
                      setEditing(false);
                    }}
                  />
                </div>
              )}
            </AnimatePresence>
            <motion.div
              key={`task-${uuid}`}
              layoutId={`task-layout-${uuid}`}
              initial={{ y: 20, scale: 0.8, opacity: 0 }}
              style={{ left: "initial" }}
              animate={{
                y: 0,
                scale: 1,
                position: editing ? "fixed" : "initial",
                top: editing ? "25%" : "initial",
                bottom: editing ? "25%" : "initial",
                filter: taskListFetching ? "blur(5px)" : "blur(0px)",
                scaleX: taskListFetching ? 0.97 : 1,
                scaleY: taskListFetching ? 0.99 : 1,
                opacity: 1,
                transition: {
                  duration: 0.4,
                  type: "tween",
                  ease: "easeInOut",
                  scale: { type: "tween", ease: "easeIn" },
                },
              }}
              exit={{ y: -20, scale: 0.9, opacity: 0 }}
              className=" z-10"
            >
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
                className="relative gap-8 sm:[--scale-to:1.2] [--scale-to:1.1]  flex flex-col max-w-[190px] rounded-3xl w-full"
              >
                {editing && (
                  <TaskListTaskOverlay
                    uuid={overlayUuid}
                    editing={editing}
                    scope={scope}
                  />
                )}
                <TaskListTaskStatus
                  editing={editing}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleComplete={handleComplete}
                  complete={complete}
                  dueDate={dueDate}
                  {...props}
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
                      uuid={overlayUuid}
                      editing={editing}
                      scope={scope}
                    />
                  )}
                  <motion.div
                    layout
                    layoutDependency={editing}
                    className="py-1"
                  >
                    <TaskTextArea
                      ref={inputRef}
                      style={{
                        outline: `2px solid rgb(180,180,180)`,
                        fontFamily: fonts.jura,
                        boxShadow: `inset 1px 1px 10px rgb(80,80,80), inset -1px -1px 10px rgb(80,80,80)`,
                        cursor: editing ? "text" : "default",
                      }}
                      className="paper border-b-0 relative resize-none text-sm px-3 w-full rounded-xl max-w-full"
                      disabled={!editing}
                      editing={editing}
                      name="task"
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
                          position: "absolute",
                          opacity: 0,
                          height: "0px",
                        }}
                        style={{
                          outline: "rgb(180, 180, 180) solid 1px",
                          background: colors.blackGradient[1],
                        }}
                        className="flex min-h-[45px] relative isolate px-3 gap-3 rounded-xl  items-center"
                        formikProps={props}
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
                      label="Task Wall"
                      handleToggle={handleToggle}
                      name="onTaskWall"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TaskListTask;
