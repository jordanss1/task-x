import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { StateType } from "../../app/store";
import { taskWallTasks } from "../../constants";
import { TaskWallTaskType } from "../../types";

const getUserTaskWallTasks = createAsyncThunk(
  "taskwall/userTasks",
  (empty: undefined, thunkApi) => {
    
  }
);

type SortType = "popular" | "recent";

type TaskWallStateType = {
  sort: SortType;
  taskWallTasks: TaskWallTaskType[] | null;
};

const initialState: TaskWallStateType = {
  taskWallTasks: taskWallTasks,
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

const taskWallSlice = createSlice({
  name: "taskWall",
  initialState,
  reducers: {
    changeSort: (state, action) => {
      state.sort = action.payload;

      if (state.taskWallTasks) {
        const sort = sortFunction(action.payload);

        state.taskWallTasks = [...state.taskWallTasks].sort((a, b) =>
          sort(a, b)
        );
      }
    },
  },
});

type TaskWallSelectorType = (state: StateType) => TaskWallStateType;

export const taskWallSelector: TaskWallSelectorType = (state) => state.taskWall;

export const { changeSort } = taskWallSlice.actions;

export default taskWallSlice.reducer;
