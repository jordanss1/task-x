import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateType } from "../../app/store";

type InitialClassesType = {
  button: string;
  border: string;
  icon: string;
  logo: string;
  heading: string;
};

export type ActionedTodoItemType = {
  id: number | null;
  classProp: string | null;
};

export type ArrowType = {
  arrow?: string | null;
  div?: string | null;
};

interface ClassesStateType {
  initialClasses: InitialClassesType | null;
  form: string;
  todoContainer: string;
  loginContainer: string;
  signInButton: string;
  signOutButton: string;
  actionedTodoItem: ActionedTodoItemType;
  placeholder: string;
  leftArrow: ArrowType;
  rightArrow: ArrowType;
}

const initialState: ClassesStateType = {
  initialClasses: null,
  form: "",
  todoContainer: "",
  loginContainer: "",
  signInButton: "",
  signOutButton: "",
  actionedTodoItem: {
    id: null,
    classProp: null,
  },
  placeholder: "",
  leftArrow: { arrow: null, div: null },
  rightArrow: { arrow: null, div: null },
};

export const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    initialClassesAdd: (state) => {
      state.initialClasses = {
        button: "button-ani",
        border: "border-ani",
        icon: "logo-icon",
        logo: "full-logo",
        heading: "logo-head",
      };
    },
    initialClassesRemove: (state) => {
      state.initialClasses = null;
    },
    formClassSet: (state, action: PayloadAction<string>) => {
      state.form = action.payload;
    },
    loginContainerSet: (state, action: PayloadAction<string>) => {
      state.loginContainer = action.payload;
    },
    todoContainerSet: (state, action: PayloadAction<string>) => {
      state.todoContainer = action.payload;
    },
    actionedTodoItemSet: {
      reducer(state, action: PayloadAction<ActionedTodoItemType>) {
        state.actionedTodoItem = action.payload;
      },
      prepare({ id, classProp }: ActionedTodoItemType): {
        payload: ActionedTodoItemType;
      } {
        return {
          payload: {
            id: id,
            classProp: classProp,
          },
        };
      },
    },
    signInButtonSet: (state, action: PayloadAction<string>) => {
      state.signInButton = action.payload;
    },
    signOutButtonSet: (state, action: PayloadAction<string>) => {
      state.signOutButton = action.payload;
    },
    placeholderSet: (state, action: PayloadAction<string>) => {
      state.placeholder = action.payload;
    },
    leftArrowSet: (state, action: PayloadAction<ArrowType>) => {
      state.leftArrow = action.payload;
    },
    rightArrowSet: (state, action: PayloadAction<ArrowType>) => {
      state.rightArrow = action.payload;
    },
  },
});

type ClassSelectorType = (state: StateType) => ClassesStateType;

export const classSelector: ClassSelectorType = (state) => state.classes;

export const {
  initialClassesAdd,
  initialClassesRemove,
  formClassSet,
  todoContainerSet,
  actionedTodoItemSet,
  loginContainerSet,
  signInButtonSet,
  signOutButtonSet,
  placeholderSet,
  leftArrowSet,
  rightArrowSet,
} = classesSlice.actions;

export default classesSlice.reducer;
