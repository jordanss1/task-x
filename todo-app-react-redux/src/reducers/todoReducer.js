import { CREATE_TODO, EDIT_TODO, DELETE_TODO } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_TODO:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
