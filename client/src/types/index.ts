import { Dayjs } from "dayjs";

export type TaskType = {
  task: string;
  dueBy: Dayjs | undefined;
  created: Dayjs;
  onTaskWall: boolean;
};
