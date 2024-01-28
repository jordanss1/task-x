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
  user: ValidUserType["profile"];
  dueDate?: string;
  enabledDueDate: boolean;
  created: string;
  complete: boolean;
  awards: AwardType[];
  likes: LikesType;
  comments: CommentType[] | [];
};

export type AwardType = "supported" | "superSupported" | "communityLegend";

export type LikesType = {
  likes: number;
  users: ValidUserType["profile"][];
};

export type CommentType = {
  user: ValidUserType["profile"];
  comment: string;
  likes: LikesType;
  created: string;
  _id: string;
};

export type ValidUserType = Omit<UserType, "profile"> & {
  profile: NonNullable<UserProfile["profile"]>;
};

export type UserProfile = {
  profile: {
    _user: string;
    userName: string;
    profilePicture: string;
  } | null;
};

export type UserType = {
  _id: string;
  _user: string;
  __v: number;
} & UserProfile;

export type UserStateType = UserType | ValidUserType | false | null;

export type AwardNotificationType = {
  taskId: string;
  task: string;
  type: "award";
  award: "supported" | "superSupported" | "communityLegend";
  unseen: boolean;
  created: string;
};

export type CommentAndLikeNotificationType = {
  taskId: string;
  task: string;
  type: "commentLike" | "newComment" | "taskLike";
  total: number;
  unseen: boolean;
  created: string;
};

export type CombinedNotificationType = {
  taskId: string;
  task: string;
  type: "award" | "commentLike" | "newComment" | "taskLike";
  commentId?: string;
  award?: "supported" | "superSupported" | "communityLegend";
  total?: number;
  unseen: boolean;
  created: string;
};

export type AllNotificationsReturnType = [
  AwardNotificationType[],
  CommentAndLikeNotificationType[],
  CommentAndLikeNotificationType[],
  CommentAndLikeNotificationType[]
];

export type AllTasksReturnType = [
  TaskType[] | false,
  TaskWallTaskType[] | false,
  TaskWallTaskType[] | false
];

export type LikeTaskRequestType = {
  previousLikes: number;
  liked: boolean;
  currentAwards: TaskWallTaskType["awards"];
  taskId: TaskWallTaskType["taskId"];
};

export type LikeCommentRequestType = {
  liked: boolean;
  _id: string;
  taskId: TaskWallTaskType["taskId"];
};

export type CommentReturnType = {
  comment: CommentType;
  taskId: TaskWallTaskType["taskId"];
};

export type NewCommentRequestType = {
  comment: string;
  taskId: TaskWallTaskType["taskId"];
};

export type EditCommentRequestType = {
  comment: string;
  _id: string;
  taskId: TaskWallTaskType["taskId"];
};

export type DeleteCommentReturnType = {
  comments: CommentType[];
  taskId: TaskWallTaskType["taskId"];
};
