import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axiosGetUserTasks, axiosSubmitTask } from "../../api";
import { StateType } from "../../app/store";
import { TaskType, TaskTypeSent } from "../../types";
import { reducerMatcherFunction } from "../auth/authSlice";
import { setError } from "../notification/notificationSlice";
import {
  assignAllWallTasks,
  assignUserWallTasks,
  updateTaskState,
} from "../taskWall/taskWallSlice";

export const submitTask = createAsyncThunk<
  TaskType[] | false,
  TaskTypeSent,
  { state: StateType }
>("taskList/submitTask", async (task, { dispatch }) => {
  try {
    const [userTasks, userTaskWallTasks, allTaskWallTasks] =
      await axiosSubmitTask(task);

    dispatch(assignAllWallTasks(allTaskWallTasks));
    dispatch(assignUserWallTasks(userTaskWallTasks));

    return userTasks;
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return false;
  }
});

export const getUserTasks = createAsyncThunk<TaskType[] | false>(
  "taskList/getUserTasks",
  async (undefined, { dispatch }) => {
    try {
      return await axiosGetUserTasks();
    } catch (err) {
      if (err instanceof AxiosError) {
        dispatch(setError(err.response?.data));
      }

      return false;
    }
  }
);

type TaskListStateType = {
  formActive: boolean;
  tasks: TaskType[] | null | false;
};

const initialState: TaskListStateType = {
  formActive: false,
  tasks: null,
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.formActive = !state.formActive;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type.includes("taskList/submitTask") ||
        action.type.includes("taskList/getUserTasks"),
      (state, action: PayloadAction<TaskType[]>) => {
        reducerMatcherFunction(action, () => {
          updateTaskState(state, action, "tasks");
          // if (action.payload) {
          //   state.tasks = action.payload;
          //   return;
          // }

          // state.tasks = state.tasks ? state.tasks : false;
        });
      }
    );
  },
});

type TaskListSelectorType = (state: StateType) => TaskListStateType;

export const taskListSelector: TaskListSelectorType = (state) => state.taskList;

export const { toggleForm } = taskListSlice.actions;

export default taskListSlice.reducer;
