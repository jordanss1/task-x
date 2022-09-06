import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import todoApi from "../../apiAxios/todos";

export const getTodos = createAsyncThunk("todos/getTodos", async (userId) => {
  let { data } = await todoApi.get("/todos");
  data = data.filter((todo) => todo.userId === userId);
  return data;
});

const initialState = {
  todos: {},
  status: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    emptyTodos: (state) => {
      state.todos = {};
    },
  },
  extraReducers: {
    [getTodos.pending]: (state) => {
      state.status = "pending";
    },
    [getTodos.fulfilled]: (state, action) => {
      state.todos = _.mapKeys(action.payload, "id");
      state.status = "success";
    },
    [getTodos.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const selectTodos = (state) => Object.values(state.todos.todos);

export const { emptyTodos } = todosSlice.actions;

export default todosSlice.reducer;
