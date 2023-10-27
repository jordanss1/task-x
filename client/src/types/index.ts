import { Dayjs } from "dayjs";

export type TaskType = {
  task: string;
  taskDueEnabled: boolean;
  dueBy: Dayjs | undefined;
  created: Dayjs;
  onTaskWall: boolean;
};
