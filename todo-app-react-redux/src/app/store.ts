import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import todosReducer from "../features/todos/todosSlice";
import classesReducer from "../features/classes/classesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    classes: classesReducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;
