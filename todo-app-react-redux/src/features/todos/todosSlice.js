import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import todoApi from "../../apiAxios/todos";

export const getTodos = createAsyncThunk("todos/getTodos", async (userId) => {
  let { data } = await todoApi.get("/todos");
  data = data.filter((todo) => todo.userId === userId);
  return data;
});

export const createTodos = createAsyncThunk(
  "todos/createTodos",
  async (todo, { getState }) => {
    const userId = getState().auth.userProfile.userId;
    const { data } = await todoApi.post("/todos", { todo, userId });
    return data;
  }
);

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
    [createTodos.pending]: (state) => {
      state.status = "pending";
    },
    [createTodos.fulfilled]: (state, action) => {
      let newTodo = { [action.payload.id]: action.payload };
      console.log(state, state.todos);
      state.status = "success";
    },
    [createTodos.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const selectTodos = (state) => Object.values(state.todos.todos);

export const { emptyTodos } = todosSlice.actions;

export default todosSlice.reducer;
