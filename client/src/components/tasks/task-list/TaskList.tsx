import dayjs, { Dayjs } from "dayjs";
import { ReactElement, useState } from "react";
import TaskListTask from "./TaskListTask";

const tasks = [
  {
    task: "Take my last exam of the year for nursing school!",
    dueBy: dayjs().subtract(2, "week"),
    taskDueEnabled: true,
    created: dayjs().subtract(2, "days"),
    onTaskWall: false,
  },
  {
    task: "Study for my exam",
    dueBy: undefined,
    taskDueEnabled: false,
    created: dayjs().subtract(5, "days"),
    onTaskWall: true,
  },
  {
    task: "Take dog for walk",
    dueBy: dayjs().add(3, "weeks"),
    taskDueEnabled: true,
    created: dayjs().subtract(2, "days"),
    onTaskWall: false,
  },
  {
    task: "Take my father to his last golf meeting for the next year!",
    dueBy: dayjs().add(4, "months"),
    taskDueEnabled: true,
    created: dayjs().subtract(5, "days"),
    onTaskWall: true,
  },
];

const TaskList = (): ReactElement => {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-8  justify-items-center py-20">
      {tasks.map((taskItem, i) => (
        <TaskListTask key={i} index={i} taskItem={taskItem} />
      ))}
    </section>
  );
};

export default TaskList;
