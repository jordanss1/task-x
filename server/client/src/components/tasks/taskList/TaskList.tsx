import dayjs from "dayjs";
import { ReactElement } from "react";
import TaskListTask from "./TaskListTask";

const tasks = [
  {
    task: "Take my last exam of the year for nursing school!",
    userId: "33",
    dueDate: dayjs().subtract(2, "week").toDate(),
    enabledDueDate: true,
    created: dayjs().subtract(2, "days").toDate(),
    onTaskWall: false,
  },
  {
    task: "Study for my exam",
    userId: "33",
    dueDate: undefined,
    enabledDueDate: false,
    created: dayjs().subtract(5, "days").toDate(),
    onTaskWall: true,
  },
  {
    task: "Take dog for walk",
    userId: "33",
    dueDate: dayjs().add(3, "weeks").toDate(),
    enabledDueDate: true,
    created: dayjs().subtract(2, "days").toDate(),
    onTaskWall: false,
  },
  {
    task: "Take my father to his last golf meeting for the next year!",
    userId: "33",
    dueDate: dayjs().add(4, "months").toDate(),
    enabledDueDate: true,
    created: dayjs().subtract(5, "days").toDate(),
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
