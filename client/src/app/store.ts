import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import taskListReducer from "../features/taskList/taskListSlice";

export const store = configureStore({
  reducer: {
    taskList: taskListReducer,
  },
});

export type AppThunkDispatch = ThunkDispatch<StateType, string, AnyAction>;

export type StateType = ReturnType<typeof store.getState>;
