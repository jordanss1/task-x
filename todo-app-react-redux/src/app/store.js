import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import todosReducer from "../features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
});
