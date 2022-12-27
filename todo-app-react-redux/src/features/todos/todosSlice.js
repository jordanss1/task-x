import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import todoApi from "../../apiAxios/todos";

export const getTodos = createAsyncThunk("todos/getTodos", async (userId) => {
  let { data } = await todoApi.get("/todos");
  data = data.filter((todo) => todo.userId === userId).slice(0, 6);
  return data;
});

export const createTodos = createAsyncThunk(
  "todos/createTodos",
  async (todo, { getState, dispatch }) => {
    const { userId } = getState().auth.userProfile;
    const { data } = await todoApi.post("/todos", { todo, userId });

    dispatch({
      type: "classes/todoItemSet",
      payload: { id: data.id, classProp: "item-in" },
    });

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
