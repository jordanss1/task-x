import dayjs, { Dayjs } from "dayjs";
import { ReactElement } from "react";
import TaskListTask from "./TaskListTask";

const tasks = [
  {
    task: "Take my last exam of the year for nursing school!",
    dueBy: dayjs().add(1, "hour"),
    created: dayjs().subtract(2, "days"),
    onTaskWall: false,
  },
  {
    task: "Study for my exam",
    dueBy: undefined,
    created: dayjs().subtract(5, "days"),
    onTaskWall: true,
  },
  {
    task: "Take dog for walk",
    dueBy: dayjs().subtract(1, "hour"),
    created: dayjs().subtract(2, "days"),
    onTaskWall: false,
  },
  {
    task: "Take my father to his last golf meeting for the next year!",
    dueBy: dayjs().add(4, "days"),
    created: dayjs().subtract(5, "days"),
    onTaskWall: true,
  },
];

const TaskList = (): ReactElement => {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-8  justify-items-center py-20">
      {tasks.map((task, i) => (
        <TaskListTask key={i} index={i} task={task} />
      ))}
    </section>
  );
};

export default TaskList;
