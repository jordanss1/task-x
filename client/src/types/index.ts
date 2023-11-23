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
  id: string;
  userId: string;
  dueDate: Date | undefined;
  enabledDueDate: boolean;
  created: Date;
  awards: AwardType[];
  likes: number;
  comments: CommentType[] | [];
};

export type AwardType = "supported" | "superSupported" | "communityLegend";

export type LikesType = Pick<UserType, "userId">[];

export type CommentType = {
  userId: string;
  comment: string;
  likes: number;
};

export type UserType = {
  userId: string;
  userName: string;
  picture: string;
};
