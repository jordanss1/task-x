import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import todoApi from "../../apiAxios/todos";
import { StateType } from "../../app/store";

export const getTodos = createAsyncThunk("todos/getTodos", async (userId) => {
  let { data } = await todoApi.get("/todos");
  data = data.filter((todo) => todo.userId === userId);
  return data;
});

export const createTodos = createAsyncThunk(
  "todos/createTodos",
  async (todo, { getState, dispatch }) => {
    const { userId } = getState().auth.userProfile;
    const { data } = await todoApi.post("/todos", { todo, userId });

    dispatch({
      type: "classes/actionedTodoItemSet",
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
    console.log(id);
    todoApi.delete(`/todos/${id}`);
    dispatch({
      type: "todos/deleteTodo/fulfilled",
      payload: id,
    });
  }
);

type TodoType = {
  todo: string;
  userId: string;
  id: number;
};

type TodosStateType = {
  fullTodos: TodoType[] | null;
  status: "success" | "failed" | "pending" | null;
};

const initialState: TodosStateType = {
  fullTodos: null,
  status: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    emptyTodos: (state) => {
      state.fullTodos = null;
    },
  },
  extraReducers: {
    [getTodos.pending]: (state) => {
      state.status = "pending";
    },
    [getTodos.fulfilled]: (state, action) => {
      state.fullTodos = _.mapKeys(action.payload, "id");
      state.status = "success";
    },
    [getTodos.rejected]: (state) => {
      state.status = "failed";
    },
    [createTodos.pending]: (state) => {
      state.status = "pending";
    },
    [createTodos.fulfilled]: (state, action) => {
      const newState = Object.values(state.fullTodos);
      newState.push(action.payload);
      state.fullTodos = _.mapKeys(newState, "id");
      state.status = "success";
    },
    [createTodos.rejected]: (state) => {
      state.status = "failed";
    },
    [editTodo.pending]: (state) => {
      state.status = "pending";
    },
    [editTodo.fulfilled]: (state, action) => {
      state.fullTodos[action.payload.id] = action.payload;
      state.status = "success";
    },
    [editTodo.rejected]: (state) => {
      state.status = "failed";
    },
    [deleteTodo.pending]: (state) => {
      state.status = "pending";
    },
    [deleteTodo.fulfilled]: (state, action) => {
      delete state.fullTodos[action.payload];
      state.status = "success";
    },
    [deleteTodo.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export type SelectTodosType = (state: StateType) => {
  fullTodos: TodoType[] | null;
};

export const selectTodos: SelectTodosType = (state) => {
  let fullTodos;
  if (state.todos.fullTodos) {
    const fullTodos = Object.values(state.todos.fullTodos);
    return { fullTodos };
  } else {
    fullTodos = null;
  }
  return { fullTodos };
};

export const { emptyTodos } = todosSlice.actions;

export default todosSlice.reducer;
