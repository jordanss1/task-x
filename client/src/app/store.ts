import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import todosReducer from "../features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
});

export type AppThunkDispatch = ThunkDispatch<StateType, string, AnyAction>;

export type StateType = ReturnType<typeof store.getState>;
