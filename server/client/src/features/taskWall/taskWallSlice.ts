import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { axiosGetAllTaskWallTasks, axiosGetUserWallTasks } from "../../api";
import { StateType } from "../../app/store";
import { TaskType, TaskWallTaskType } from "../../types";
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

export type SortType = "popular" | "recent";

type CategoryType = "user" | "all";

type TaskWallStateType = {
  sort: SortType;
  category: CategoryType;
  allTaskWallTasks: TaskWallTaskType[] | null | false;
  userTaskWallTasks: TaskWallTaskType[] | null | false;
  taskWallFetching: boolean;
};

const initialState: TaskWallStateType = {
  allTaskWallTasks: null,
  userTaskWallTasks: null,
  category: "all",
  sort: "popular",
  taskWallFetching: false,
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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
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
} = taskWallSlice.actions;

export default taskWallSlice.reducer;
