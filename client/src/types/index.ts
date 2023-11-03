
export type TaskType = {
  task: string;
  enabledDueDate: boolean;
  dueDate: Date | undefined;
  created: Date;
  onTaskWall: boolean;
};
