import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import todoApi from "../../apiAxios/todos";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const response = await todoApi.get("/todos");
  return response.data;
});

const initialState = {
  todos: {},
  status: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
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

export const selectTodos = (state) => state.todos.todos;

export default todosSlice.reducer;
