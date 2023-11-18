export type TaskType = {
  task: string;
  userId: string;
  enabledDueDate: boolean;
  dueDate: Date | undefined;
  created: Date;
  onTaskWall: boolean;
};

export type TaskWallTaskType = {
  task: string;
  userId: string;
  dueDate: Date | undefined;
  enabledDueDate: boolean;
  created: Date;
  awards: AwardType[];
  likes: number;
  comments: CommentType[] | [];
};

type AwardType = "supported" | "superSupported" | "communityLegend";

type CommentType = {
  userId: string;
  comment: string;
  likes: number;
};

export type UserType = {
  userId: string;
  userName: string;
  picture: string;
};
