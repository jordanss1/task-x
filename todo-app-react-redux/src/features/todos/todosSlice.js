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
    const { userId } = getState().auth.userProfile;
    const { data } = await todoApi.post("/todos", { todo, userId });
    return data;
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ editId, promptValue }) => {
    const { data } = await todoApi.patch(`/todos/${editId}`, {
      todo: promptValue,
    });
    return data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { dispatch }) => {
    todoApi.delete(`/todos/${id}`);
    dispatch({
      type: "todos/deleteTodo/fulfilled",
      payload: id,
    });
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
      const newState = Object.values(state.todos);
      newState.push(action.payload);
      state.todos = _.mapKeys(newState, "id");
      state.status = "success";
    },
    [createTodos.rejected]: (state) => {
      state.status = "failed";
    },
    [editTodo.pending]: (state) => {
      state.status = "pending";
    },
    [editTodo.fulfilled]: (state, action) => {
      state.todos[action.payload.id] = action.payload;
      state.status = "success";
    },
    [editTodo.rejected]: (state) => {
      state.status = "failed";
    },
    [deleteTodo.pending]: (state) => {
      state.status = "pending";
    },
    [deleteTodo.fulfilled]: (state, action) => {
      delete state.todos[action.payload];
      state.status = "success";
    },
    [deleteTodo.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const selectTodos = (state) => Object.values(state.todos.todos);

export const { emptyTodos } = todosSlice.actions;

export default todosSlice.reducer;

/*
{
      "todo": "Go to gym",
      "id": 4
    },
    {
      "todo": "Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut labore et dolor",
      "id": 10
    },
    {
      "todo": "Go to doctors",
      "userId": "117038401482671780523",
      "id": 12
    },
    {
      "todo": "Lorem ipsum dolor sit amet",
      "userId": "117038401482671780523",
      "id": 13
    },
    {
      "todo": "Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut labore et dolor",
      "userId": "117038401482671780523",
      "id": 14
    },
    {
      "todo": "Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod ",
      "userId": "117038401482671780523",
      "id": 15
    },
    {
      "todo": "Lorem ipsum dolor sit amet",
      "userId": "117038401482671780523",
      "id": 16
    },
    {
      "todo": "Lorem ipsum dolor sit amet, consectetur adip, sed do",
      "userId": "117038401482671780523",
      "id": 17
    },
    {
      "todo": "Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut labore et dolor",
      "userId": "117038401482671780523",
      "id": 18
    }
*/
