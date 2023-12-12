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
  user: UserType;
  dueDate: Date | undefined;
  enabledDueDate: boolean;
  created: Date;
  awards: AwardType[];
  likes: number;
  comments: CommentType[] | [];
};

export type AwardType = "supported" | "superSupported" | "communityLegend";

export type LikesType = Pick<UserType, "googleId">[];

export type CommentType = {
  user: UserType;
  comment: string;
  likes: number;
};

export type UserType = {
  _id: string;
  googleId: string;
  __v: number;
  userDetails: {
    userName: string;
    profilePicture: string;
  };
};
