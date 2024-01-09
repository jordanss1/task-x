import dayjs from "dayjs";
import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { taskListSelector } from "../features/taskList/taskListSlice";
import { TaskType } from "../types";

type UseSortTasksType = {
  sortBy: "Due" | "Not due" | "Complete";
};

const useSortTasks = ({
  sortBy,
}: UseSortTasksType): TaskType[] | null | false => {
  const { tasks } = useSelector(taskListSelector);
  const [sortedTasks, setSortedTasks] = useState<TaskType[] | null | false>(
    null
  );

  useEffect(() => {
    if (tasks === false || tasks === null) {
      setSortedTasks(false);
      return;
    }

    if (sortBy === "Due") {
      let sortedTasks = tasks
        .filter((task) => task.enabledDueDate === true && !task.complete)
        .sort(
          (taskA: TaskType, taskB: TaskType) =>
            dayjs(taskA.dueDate).valueOf() - dayjs(taskB.dueDate).valueOf()
        );

      setSortedTasks(sortedTasks ? sortedTasks : false);
    }

    if (sortBy === "Not due") {
      const newTasks = tasks?.filter(
        (task) => task.enabledDueDate === false && !task.complete
      );

      setSortedTasks(newTasks ? newTasks : false);
    }

    if (sortBy === "Complete") {
      const newTasks = tasks?.filter((task) => task.complete === true);

      setSortedTasks(newTasks ? newTasks : false);
    }
  }, [tasks]);

  return sortedTasks;
};

export default useSortTasks;
