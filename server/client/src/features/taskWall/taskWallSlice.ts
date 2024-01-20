import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import {
  axiosDeleteComment,
  axiosEditComment,
  axiosGetAllTaskWallTasks,
  axiosGetUserWallTasks,
  axiosLikeComment,
  axiosLikeTask,
  axiosSubmitComment,
  axiosUpdateUserProfileContent,
} from "../../api";
import { StateType } from "../../app/store";
import { PopupPropsType } from "../../components/__reusable/Popup";
import {
  CommentReturnType,
  CommentType,
  DeleteCommentReturnType,
  EditCommentRequestType,
  LikeCommentRequestType,
  LikeTaskRequestType,
  NewCommentRequestType,
  TaskType,
  TaskWallTaskType,
  ValidUserType,
} from "../../types";
import { setError } from "../notification/notificationSlice";

export const getUserWallTasks = createAsyncThunk<
  TaskWallTaskType[] | false,
  undefined,
  { state: StateType }
>("taskWall/userTasks", async (undefined, { dispatch, getState }) => {
  const { taskList, taskWall } = getState();

  const fetching = taskList.taskListFetching && taskWall.taskWallFetching;

  if (!fetching) {
    dispatch(setTaskWallFetching(true));
  }

  try {
    return await axiosGetUserWallTasks();
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return false;
  }
});

export const getAllTaskWallTasks = createAsyncThunk<
  TaskWallTaskType[] | false,
  undefined,
  { state: StateType }
>("taskWall/allTasks", async (undefined, { dispatch, getState }) => {
  const { taskList, taskWall } = getState();

  const fetching = taskList.taskListFetching && taskWall.taskWallFetching;

  if (!fetching) {
    dispatch(setTaskWallFetching(true));
  }

  try {
    return await axiosGetAllTaskWallTasks();
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return false;
  }
});

export const submitComment = createAsyncThunk<
  CommentReturnType | null,
  NewCommentRequestType,
  { state: StateType }
>("taskWall/submitComment", async (comment, { dispatch }) => {
  try {
    return await axiosSubmitComment(comment);
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return null;
  }
});

export const editComment = createAsyncThunk<
  CommentReturnType | null,
  EditCommentRequestType,
  { state: StateType }
>("taskWall/editComment", async (comment, { dispatch }) => {
  try {
    return await axiosEditComment(comment);
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return null;
  }
});
export const deleteComment = createAsyncThunk<
  DeleteCommentReturnType | null,
  Omit<EditCommentRequestType, "comment">,
  { state: StateType }
>("taskWall/deleteComment", async (comment, { dispatch, getState }) => {
  const { taskWallFetching } = getState().taskWall;

  if (!taskWallFetching) {
    dispatch(setTaskWallFetching(true));
  }

  try {
    return await axiosDeleteComment(comment);
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return null;
  }
});

export const sendTaskLike = createAsyncThunk<
  TaskWallTaskType | null,
  LikeTaskRequestType,
  { state: StateType }
>("taskWall/likeTask", async (like, { dispatch }) => {
  try {
    return await axiosLikeTask(like);
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return null;
  }
});

export const sendCommentLike = createAsyncThunk<
  CommentReturnType | null,
  LikeCommentRequestType,
  { state: StateType }
>("taskWall/likeComment", async (like, { dispatch }) => {
  try {
    return await axiosLikeComment(like);
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return null;
  }
});

export const updateUserProfileContent = createAsyncThunk<
  void,
  undefined,
  { state: StateType }
>("taskWall/updatedUserProfileContent", async (undefined, { dispatch }) => {
  try {
    const [allTaskWallTasks, userTaskWallTasks] =
      await axiosUpdateUserProfileContent();

    dispatch(assignAllWallTasks(allTaskWallTasks));

    dispatch(assignUserWallTasks(userTaskWallTasks));
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    console.log(err);
  }
});

export type SortType = "popular" | "recent";

type CategoryType = "user" | "all";

type TaskWallStateType = {
  sort: SortType;
  category: CategoryType;
  allTaskWallTasks: TaskWallTaskType[] | null | false;
  userTaskWallTasks: TaskWallTaskType[] | null | false;
  taskWallFetching: boolean;
  taskWallPrompt: PopupPropsType["prompt"];
};

const initialState: TaskWallStateType = {
  allTaskWallTasks: null,
  userTaskWallTasks: null,
  category: "all",
  sort: "popular",
  taskWallFetching: false,
  taskWallPrompt: undefined,
};

const sortFunction = (sort: SortType) => {
  switch (sort) {
    case "popular":
      return (taska: TaskWallTaskType, taskb: TaskWallTaskType) =>
        taskb.likes.likes - taska.likes.likes;
    case "recent":
      return (taska: TaskWallTaskType, taskb: TaskWallTaskType) =>
        dayjs(taskb.created).valueOf() - dayjs(taska.created).valueOf();
  }
};

export const updateTaskState = (
  state: any,
  action: PayloadAction<TaskWallTaskType[] | TaskType[] | false>,
  taskState: string
) => {
  console.log(action.payload);

  if (action.payload) {
    state[taskState] = action.payload;
    return;
  }

  if (action.payload === null) {
    state[taskState] = false;
    return;
  }

  state[taskState] = state[taskState] ? state[taskState] : false;
};

const taskWallSlice = createSlice({
  name: "taskWall",
  initialState,
  reducers: {
    changeSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;

      if (state.allTaskWallTasks) {
        const sort = sortFunction(action.payload);

        state.allTaskWallTasks = [...state.allTaskWallTasks].sort((a, b) =>
          sort(a, b)
        );
      }
    },
    changeCategory: (state, action: PayloadAction<CategoryType>) => {
      state.category = action.payload;
    },
    assignAllWallTasks: (
      state,
      action: PayloadAction<TaskWallTaskType[] | false>
    ) => {
      const sort = sortFunction(state.sort);

      if (action.payload) {
        action.payload = [...action.payload].sort((a, b) => sort(a, b));
      }

      console.log(action.payload);

      updateTaskState(state, action, "allTaskWallTasks");
    },
    assignUserWallTasks: (
      state,
      action: PayloadAction<TaskWallTaskType[] | false>
    ) => {
      updateTaskState(state, action, "userTaskWallTasks");
    },
    setTaskWallFetching: (state, action: PayloadAction<boolean>) => {
      state.taskWallFetching = action.payload;
    },
    setTaskWallPrompt: (
      state,
      action: PayloadAction<PopupPropsType["prompt"]>
    ) => {
      state.taskWallPrompt = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          ["taskWall/userTasks", "taskWall/allTasks"].some((type) =>
            action.type.includes(type)
          ),
        (state, action: PayloadAction<TaskWallTaskType[] | false>) => {
          if (action.payload === undefined) {
            return;
          }

          if (action.type.includes("allTasks")) {
            const sort = sortFunction(state.sort);

            if (action.payload) {
              action.payload = [...action.payload].sort((a, b) => sort(a, b));
            }

            updateTaskState(state, action, "allTaskWallTasks");

            if (state.taskWallFetching) {
              state.taskWallFetching = false;
            }
            return;
          }

          updateTaskState(state, action, "userTaskWallTasks");

          if (state.taskWallFetching) {
            state.taskWallFetching = false;
          }
        }
      )
      .addMatcher(
        (action) => action.type.includes("taskWall/likeTask"),
        (state, action: PayloadAction<TaskWallTaskType | null>) => {
          if (action.payload && state.allTaskWallTasks) {
            state.allTaskWallTasks = state.allTaskWallTasks.map((task) =>
              task.taskId === action.payload?.taskId ? action.payload : task
            );

            if (state.userTaskWallTasks) {
              state.userTaskWallTasks = state.userTaskWallTasks.map((task) =>
                task.taskId === action.payload?.taskId ? action.payload : task
              );
            }
          }
        }
      )
      .addMatcher(
        (action) => action.type.includes("taskWall/likeComment"),
        (state, action: PayloadAction<CommentReturnType | null>) => {
          if (action.payload && state.allTaskWallTasks) {
            const taskIndex = state.allTaskWallTasks.findIndex(
              (task) => task.taskId === action.payload?.taskId
            );

            const commentIndex = state.allTaskWallTasks[
              taskIndex
            ].comments.findIndex(
              (comment) => comment._id === action.payload?.comment._id
            );

            state.allTaskWallTasks[taskIndex].comments[commentIndex] =
              action.payload?.comment;

            if (state.userTaskWallTasks) {
              const taskIndex = state.userTaskWallTasks.findIndex(
                (task) => task.taskId === action.payload?.taskId
              );

              if (taskIndex > -1) {
                state.userTaskWallTasks[taskIndex].comments[commentIndex] =
                  action.payload?.comment;
              }
            }
          }
        }
      )

      .addMatcher(
        (action) =>
          ["taskWall/submitComment", "taskWall/editComment"].some((type) =>
            action.type.includes(type)
          ),
        (state, action: PayloadAction<CommentReturnType | null>) => {
          if (action.payload && state.allTaskWallTasks) {
            const taskIndex = state.allTaskWallTasks.findIndex(
              (task) => task.taskId === action.payload?.taskId
            );

            let userTaskIndex = -1;

            if (state.userTaskWallTasks) {
              userTaskIndex = state.userTaskWallTasks.findIndex(
                (task) => task.taskId === action.payload?.taskId
              );
            }

            if (action.type.includes("submitComment")) {
              state.allTaskWallTasks[taskIndex].comments = [
                ...state.allTaskWallTasks[taskIndex].comments,
                action.payload.comment,
              ];

              if (userTaskIndex > -1 && state.userTaskWallTasks) {
                state.userTaskWallTasks[userTaskIndex].comments = [
                  ...state.userTaskWallTasks[userTaskIndex].comments,
                  action.payload.comment,
                ];
              }
            }

            if (action.type.includes("editComment")) {
              const commentIndex = state.allTaskWallTasks[
                taskIndex
              ].comments.findIndex(
                (comment) => comment._id === action.payload?.comment._id
              );

              state.allTaskWallTasks[taskIndex].comments[commentIndex] =
                action.payload?.comment;

              if (userTaskIndex > -1 && state.userTaskWallTasks) {
                const commentIndex = state.userTaskWallTasks[
                  userTaskIndex
                ].comments.findIndex(
                  (comment) => comment._id === action.payload?.comment._id
                );

                state.userTaskWallTasks[userTaskIndex].comments[commentIndex] =
                  action.payload?.comment;
              }
            }
          }
        }
      )
      .addMatcher(
        (action) => action.type.includes("taskWall/deleteComment"),
        (state, action: PayloadAction<DeleteCommentReturnType | null>) => {
          if (action.payload && state.allTaskWallTasks) {
            const taskIndex = state.allTaskWallTasks.findIndex(
              (task) => task.taskId === action.payload?.taskId
            );

            state.allTaskWallTasks[taskIndex].comments = [
              ...action.payload.comments,
            ];

            if (state.userTaskWallTasks) {
              const userTaskIndex = state.userTaskWallTasks.findIndex(
                (task) => task.taskId === action.payload?.taskId
              );

              state.userTaskWallTasks[userTaskIndex].comments = [
                ...action.payload.comments,
              ];
            }
          }

          if (state.taskWallFetching) {
            state.taskWallFetching = false;
          }
        }
      );
  },
});

type TaskWallSelectorType = (state: StateType) => TaskWallStateType;

export const taskWallSelector: TaskWallSelectorType = (state) => state.taskWall;

export const {
  changeSort,
  changeCategory,
  assignAllWallTasks,
  assignUserWallTasks,
  setTaskWallFetching,
  setTaskWallPrompt,
} = taskWallSlice.actions;

export default taskWallSlice.reducer;
