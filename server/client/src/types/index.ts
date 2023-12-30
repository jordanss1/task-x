export type TaskType = {
  task: string;
  taskId: string;
  enabledDueDate: boolean;
  dueDate: Date | undefined;
  created: Date;
  onTaskWall: boolean;
};

export type TaskWallTaskType = {
  task: string;
  taskId: string;
  user: ValidUserType;
  dueDate: Date | undefined;
  enabledDueDate: boolean;
  created: Date;
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
