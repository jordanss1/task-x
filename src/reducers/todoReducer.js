import { CREATE_TODO, EDIT_TODO, DELETE_TODO } from "../actions/types";

export default () => {
  switch (type) {
    case CREATE_TODO:
      return [...state, action.payload];
  }
};
