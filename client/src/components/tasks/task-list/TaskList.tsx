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
    dueBy: dayjs().subtract(1, "hour"),
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
  const isTaskDue = (date: Dayjs) => {
    date.isBefore(dayjs());
  };

  return (
    <section className="grid grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-8  justify-items-center pt-20">
      {tasks.map((task) => (
        <TaskListTask task={task} />
      ))}
    </section>
  );
};

export default TaskList;
