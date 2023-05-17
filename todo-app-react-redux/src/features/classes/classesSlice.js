import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialClasses: {},
  form: "",
  todoContainer: "",
  loginContainer: "",
  signInButton: "",
  signOutButton: "",
  actionedTodoItem: {},
  placeholder: "",
  leftArrow: {},
  rightArrow: {},
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
    actionedTodoItemSet: {
      reducer(state, action) {
        state.actionedTodoItem = action.payload;
      },
      prepare({ id, classProp }) {
        return {
          payload: {
            id: id,
            classProp: classProp,
          },
        };
      },
    },
    signInButtonSet: (state, action) => {
      state.signInButton = action.payload;
    },
    signOutButtonSet: (state, action) => {
      state.signOutButton = action.payload;
    },
    placeholderSet: (state, action) => {
      state.placeholder = action.payload;
    },
    leftArrowSet: (state, action) => {
      state.leftArrow = action.payload;
    },
    rightArrowSet: (state, action) => {
      state.rightArrow = action.payload;
    },
  },
});

export const classSelector = (state) => state.classes;

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
