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
  user: ValidUserType;
  dueDate: Date | undefined;
  enabledDueDate: boolean;
  created: Date;
  awards: AwardType[];
  likes: number;
  comments: CommentType[] | [];
};

export type AwardType = "supported" | "superSupported" | "communityLegend";

export type LikesType = Pick<NonNullable<UserType>, "googleId">[];

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
  googleId: string;
  __v: number;
  profile: UserProfile;
};

export type UserStateType = UserType | ValidUserType | false | null;
