import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import assetsReducer from "../features/assets/assetsSlice";
import authSlice from "../features/auth/authSlice";
import taskListReducer from "../features/taskList/taskListSlice";
import taskWallReducer from "../features/taskWall/taskWallSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    taskList: taskListReducer,
    taskWall: taskWallReducer,
    assets: assetsReducer,
  },
});

export type AppThunkDispatch = ThunkDispatch<StateType, string, AnyAction>;

export type StateType = ReturnType<typeof store.getState>;
