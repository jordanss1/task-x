import React from "react";
import { useSelector } from "react-redux";
import { selectTodos } from "../features/todos/todosSlice";
import { authSelector } from "../features/auth/authSlice";
import "../style/body.css";

const TodoList = () => {
  const todos = useSelector(selectTodos);
  const { userProfile } = useSelector(authSelector);

  

  return <div id="todoContainer" className="d-grid"></div>;
};

export default TodoList;
