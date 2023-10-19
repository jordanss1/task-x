import { Dayjs } from "dayjs";

export type TaskType = {
  task: string;
  dueBy: Dayjs;
  created: Dayjs;
  onTaskWall: boolean;
};
