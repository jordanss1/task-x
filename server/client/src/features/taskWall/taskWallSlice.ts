import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { axiosGetAllTaskWallTasks, axiosGetUserWallTasks } from "../../api";
import { StateType } from "../../app/store";
import { taskWallTasks } from "../../constants";
import { TaskType, TaskWallTaskType } from "../../types";
import { setError } from "../notification/notificationSlice";

export const getUserWallTasks = createAsyncThunk<TaskWallTaskType[] | false>(
  "taskWall/userTasks",
  async (undefined, { dispatch }) => {
    try {
      return await axiosGetUserWallTasks();
    } catch (err) {
      if (err instanceof AxiosError) {
        dispatch(setError(err.response?.data));
      }

      return false;
    }
  }
);

export const getAllTaskWallTasks = createAsyncThunk<TaskWallTaskType[] | false>(
  "taskWall/allTasks",
  async (undefined, { dispatch }) => {
    try {
      return await axiosGetAllTaskWallTasks();
    } catch (err) {
      if (err instanceof AxiosError) {
        dispatch(setError(err.response?.data));
      }

      return false;
    }
  }
);

type SortType = "popular" | "recent";

type TaskWallStateType = {
  sort: SortType;
  allTaskWallTasks: TaskWallTaskType[] | null | false;
  userTaskWallTasks: TaskWallTaskType[] | null | false;
};

const initialState: TaskWallStateType = {
  allTaskWallTasks: null,
  userTaskWallTasks: null,
  sort: "popular",
};

const sortFunction = (sort: SortType) => {
  switch (sort) {
    case "popular":
      return (taska: TaskWallTaskType, taskb: TaskWallTaskType) =>
        taskb.likes - taska.likes;
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
  if (action.payload) {
    state[taskState] = action.payload;
    return;
  }

  state[taskState] = state[taskState] ? state[taskState] : false;
};

const taskWallSlice = createSlice({
  name: "taskWall",
  initialState,
  reducers: {
    changeSort: (state, action) => {
      state.sort = action.payload;

      if (state.allTaskWallTasks) {
        const sort = sortFunction(action.payload);

        state.allTaskWallTasks = [...state.allTaskWallTasks].sort((a, b) =>
          sort(a, b)
        );
      }
    },
    assignAllWallTasks: (
      state,
      action: PayloadAction<TaskWallTaskType[] | false>
    ) => {
      updateTaskState(state, action, "allTaskWallTasks");
    },
    assignUserWallTasks: (
      state,
      action: PayloadAction<TaskWallTaskType[] | false>
    ) => {
      updateTaskState(state, action, "userTaskWallTasks");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        ["taskWall/userTasks", "taskWall/allTasks"].some((type) =>
          action.type.includes(type)
        ),
      (state, action: PayloadAction<TaskWallTaskType[] | false>) => {
        if (action.type.includes("allTasks")) {
          return updateTaskState(state, action, "allTaskWallTasks");
        }

        updateTaskState(state, action, "userTaskWallTasks");
      }
    );
  },
});

type TaskWallSelectorType = (state: StateType) => TaskWallStateType;

export const taskWallSelector: TaskWallSelectorType = (state) => state.taskWall;

export const { changeSort, assignAllWallTasks, assignUserWallTasks } =
  taskWallSlice.actions;

export default taskWallSlice.reducer;
