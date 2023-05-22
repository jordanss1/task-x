import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import _ from "lodash";
import todoApi from "../../apiAxios/todos";
import { StateType } from "../../app/store";
import { UserProfileType } from "../auth/authSlice";

export type AppThunkDispatch = ThunkDispatch<StateType, string, AnyAction>;

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (userId: string) => {
    let { data } = await todoApi.get("/todos");
    data = data.filter((todo: TodoType) => todo.userId === userId);
    return data;
  }
);

export const createTodos = createAsyncThunk(
  "todos/createTodo",
  async (todo: string, { getState, dispatch }): Promise<TodoType> => {
    const state = getState() as StateType;
    const { userId } = state.auth.userProfile as UserProfileType;
    const { data } = await todoApi.post("/todos", { todo, userId });

    dispatch({
      type: "classes/actionedTodoItemSet",
      payload: { id: data.id, classProp: "item-in" },
    });

    return data as TodoType;
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({
    editId,
    promptValue,
  }: {
    editId: number;
    promptValue: string;
  }): Promise<TodoType> => {
    const { data } = await todoApi.patch(`/todos/${editId}`, {
      todo: promptValue,
    });

    return data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number, { dispatch }) => {
    await todoApi.delete(`/todos/${id}`);

    dispatch({
      type: "todos/deleteTodo/fulfilled",
      payload: id,
    });
  }
);

export type TodoType = {
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

type ReducerMatcherType = (
  action: AnyAction,
  state: TodosStateType,
  func: () => void
) => void;

const reducerMatcherFunctions: ReducerMatcherType = (action, state, func) => {
  if (action.type.includes("pending")) state.status = "pending";
  if (action.type.includes("fulfilled")) {
    state.status = "success";
    func();
  } else state.status = "failed";
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    emptyTodos: (state) => {
      state.fullTodos = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: PayloadAction<TodoType[]>) =>
          action.type.includes("todos/getTodos"),
        (state, action) => {
          reducerMatcherFunctions(
            action,
            state,
            () => (state.fullTodos = _.mapKeys(action.payload, "id"))
          );
        }
      )
      .addMatcher(
        (action: PayloadAction<TodoType>) =>
          action.type.includes("todos/createTodo"),
        (state, action) => {
          reducerMatcherFunctions(action, state, () => {
            const newState = state.fullTodos
              ? Object.values(state.fullTodos)
              : [];
            state.fullTodos = _.mapKeys([...newState, action.payload], "id");
          });
        }
      )
      .addMatcher(
        (action: PayloadAction<TodoType>) =>
          action.type.includes("todos/editTodo"),
        (state, action) => {
          reducerMatcherFunctions(action, state, () => {
            if (state.fullTodos) {
              state.fullTodos[action.payload.id] = action.payload;
            }
          });
        }
      )
      .addMatcher(
        (action: PayloadAction<number>) =>
          action.type.includes("todos/deleteTodo"),
        (state, action) => {
          reducerMatcherFunctions(action, state, () => {
            if (state.fullTodos) {
              delete state.fullTodos[action.payload];
            }
          });
        }
      );
  },
});

export type SelectTodosType = (state: StateType) => {
  fullTodos: TodoType[] | null;
};

export const selectTodos: SelectTodosType = (state) => {
  if (state.todos.fullTodos) {
    const fullTodos = Object.values(state.todos.fullTodos);
    return { fullTodos };
  }
  return { fullTodos: null };
};

export const { emptyTodos } = todosSlice.actions;

export default todosSlice.reducer;
