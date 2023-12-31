import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axiosSubmitTask } from "../../api";
import { StateType } from "../../app/store";
import { TaskType, TaskTypeSent } from "../../types";
import { reducerMatcherFunction } from "../auth/authSlice";
import { setError } from "../error/errorSlice";

export const submitTask = createAsyncThunk<TaskType[] | false, TaskTypeSent>(
  "taskList/submitTask",
  async (task, { dispatch }) => {
    try {
      return await axiosSubmitTask(task);
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
      (action) => action.type.includes("taskList/submitTask"),
      (state, action: PayloadAction<TaskType[]>) =>
        reducerMatcherFunction(action, () => {
          console.log(action.payload);
          state.tasks = action.payload || state.tasks;
        })
    );
  },
});

type TaskListSelectorType = (state: StateType) => TaskListStateType;

export const taskListSelector: TaskListSelectorType = (state) => state.taskList;

export const { toggleForm } = taskListSlice.actions;

export default taskListSlice.reducer;
