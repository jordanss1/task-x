import {
  AnyAction,
  PayloadAction,
  ThunkDispatch,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  SubmitTaskReturnType,
  axiosDeleteTask,
  axiosGetUserTasks,
  axiosSubmitTask,
} from "../../api";
import { StateType } from "../../app/store";
import { TaskType, TaskTypeSent } from "../../types";
import { reducerMatcherFunction } from "../auth/authSlice";
import { setError, setSuccess } from "../notification/notificationSlice";
import {
  assignAllWallTasks,
  assignUserWallTasks,
  updateTaskState,
} from "../taskWall/taskWallSlice";

type AxiosFunctionType =
  | ((task: TaskType) => Promise<SubmitTaskReturnType>)
  | ((task: TaskTypeSent) => Promise<SubmitTaskReturnType>);

const returnTasksAndUpdateStore = async (
  dispatch: ThunkDispatch<StateType, unknown, AnyAction>,
  arg: any,
  successArg: string,
  axiosFunction: AxiosFunctionType
) => {
  dispatch(setFetching(true));

  console.log(arg);

  try {
    const [userTasks, userTaskWallTasks, allTaskWallTasks] =
      await axiosFunction(arg);

    console.log(userTasks);

    dispatch(assignAllWallTasks(allTaskWallTasks));
    dispatch(assignUserWallTasks(userTaskWallTasks));

    dispatch(setSuccess(successArg));

    return userTasks;
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(setError(err.response?.data));
    }

    return false;
  }
};

export const submitTask = createAsyncThunk<
  TaskType[] | false,
  TaskTypeSent,
  { state: StateType }
>("taskList/submitTask", async (task, { dispatch }) => {
  return returnTasksAndUpdateStore(
    dispatch,
    task,
    "Task created successfully",
    axiosSubmitTask
  );
});

export const getUserTasks = createAsyncThunk<TaskType[] | false>(
  "taskList/getUserTasks",
  async (undefined, { dispatch }) => {
    try {
      return await axiosGetUserTasks();
    } catch (err) {
      if (err instanceof AxiosError) {
        dispatch(setError(err.response?.data));
      }

      return false;
    }
  }
);

export const deleteTask = createAsyncThunk<
  TaskType[] | false,
  TaskType,
  { state: StateType }
>("taskList/deleteTask", async (task, { dispatch }) => {
  return returnTasksAndUpdateStore(
    dispatch,
    task,
    "Task has been deleted",
    axiosDeleteTask
  );
});

type TaskListStateType = {
  formActive: boolean;
  tasks: TaskType[] | null | false;
  fetching: boolean;
};

const initialState: TaskListStateType = {
  formActive: false,
  tasks: null,
  fetching: false,
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.formActive = !state.formActive;
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          ["taskList/submitTask", "taskList/getUserTasks"].some((type) =>
            action.type.includes(type)
          ),
        (state, action: PayloadAction<TaskType[] | false>) => {
          reducerMatcherFunction(action, () => {
            updateTaskState(state, action, "tasks");
            state.fetching = false;
          });
        }
      )
      .addMatcher(
        (action) => action.type.includes("taskList/deleteTask"),
        (state, action: PayloadAction<TaskType[] | false>) => {
          if (action.payload === false) {
            state.tasks = state.tasks;
            state.fetching = false;
            return;
          }

          if (action.payload && action.payload.length) {
            state.tasks = action.payload;
            state.fetching = false;
            return;
          }

          if (!action.payload) {
            state.tasks = false;
            state.fetching = false;
          }
        }
      );
  },
});

type TaskListSelectorType = (state: StateType) => TaskListStateType;

export const taskListSelector: TaskListSelectorType = (state) => state.taskList;

export const { toggleForm, setFetching } = taskListSlice.actions;

export default taskListSlice.reducer;
