import { createSlice } from "@reduxjs/toolkit";
import { StateType } from "../../app/store";

type TaskListStateType = {
  formActive: boolean;
};

const initialState = {
  formActive: false,
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    toggleForm: (state) => {
      console.log(state.formActive);
      state.formActive = !state.formActive;
    },
  },
});

type TaskListSelectorType = (state: StateType) => TaskListStateType;

export const taskListSelector: TaskListSelectorType = (state) => state.taskList;

export const { toggleForm } = taskListSlice.actions;

export default taskListSlice.reducer;
