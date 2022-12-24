import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialClasses: {},
  form: "",
  todoContainer: "",
  todoItem: "",
  noTodos: "",
  loginContainer: "",
  signInButton: "",
  signOutButton: "",
  id: null,
};

export const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    initialClassesAdd: (state) => {
      state.initialClasses = {
        button: "button-ani",
        container: "start-ani",
        border: "border-ani",
        icon: "logo-icon",
        logo: "full-logo",
        heading: "logo-head",
      };
    },
    initialClassesRemove: (state) => {
      state.initialClasses = {};
    },
    formClassSet: (state, action) => {
      state.form = action.payload;
    },
    loginContainerSet: (state, action) => {
      state.loginContainer = action.payload;
    },
    todoContainerSet: (state, action) => {
      state.todoContainer = action.payload;
    },
    holdId: (state, action) => {
      state.id = action.payload;
    },
    noTodosSet: (state, action) => {
      state.noTodos = action.payload;
    },
    signInButtonSet: (state, action) => {
      state.signInButton = action.payload;
    },
    signOutButtonSet: (state, action) => {
      state.signOutButton = action.payload;
    },
  },
});

export const classSelector = (state) => state.classes;

export const {
  initialClassesAdd,
  initialClassesRemove,
  formClassSet,
  todoContainerSet,
  todoItemSet,
  noTodosSet,
  holdId,
  loginContainerSet,
  signInButtonSet,
  signOutButtonSet,
} = classesSlice.actions;

export default classesSlice.reducer;
