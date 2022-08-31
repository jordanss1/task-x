import { combineReducers } from "redux";
import authReducer from "./authReducer";
import todoReducer from "./todoReducer";

export default combineReducers({
  auth: authReducer,
  todos: todoReducer,
});
