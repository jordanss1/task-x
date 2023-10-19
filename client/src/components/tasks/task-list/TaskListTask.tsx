import { Dayjs } from "dayjs";
import { ReactElement } from "react";
import { TaskType } from "../../../types";

type TaskListTaskPropsType = {
  task: TaskType;
};

const TaskListTask = ({ task }: TaskListTaskPropsType): ReactElement => {
  return (
    <div className="flex max-w-[230px] w-full min-h-[200px] items-center justify-center bg-neutral-900">
      <p className="">{task.task}</p>
    </div>
  );
};

export default TaskListTask;
