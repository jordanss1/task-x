export type TaskType = {
  task: string;
  taskId: string;
  enabledDueDate: boolean;
  dueDate?: string;
  created: string;
  onTaskWall: boolean;
  complete: boolean;
};

export type TaskTypeSent = Omit<TaskType, "created" | "taskId" | "complete">;

export type TaskWallTaskType = {
  task: string;
  taskId: string;
  user: ValidUserType;
  dueDate?: string;
  enabledDueDate: boolean;
  created: string;
  complete: boolean;
  awards: AwardType[];
  likes: number;
  comments: CommentType[] | [];
};

export type AwardType = "supported" | "superSupported" | "communityLegend";

export type LikesType = Pick<NonNullable<UserType>, "userId">[];

export type CommentType = {
  user: ValidUserType;
  comment: string;
  likes: number;
  created: string;
};

export type ValidUserType = Omit<UserType, "profile"> & {
  profile: NonNullable<UserProfile["profile"]>;
};

export type UserProfile = {
  profile: {
    userName: string;
    profilePicture: string;
  } | null;
};

export type UserType = {
  _id: string;
  userId: string;
  __v: number;
} & UserProfile;

export type UserStateType = UserType | ValidUserType | false | null;
