import React from "react";
import { useSelector } from "react-redux";
import { selectTodos } from "../features/todos/todosSlice";
import { authSelector } from "../features/auth/authSlice";
import "../style/body.css";

const TodoList = () => {
  const todos = useSelector(selectTodos);
  const { isSignedIn } = useSelector(authSelector);

  const renderTodos = () => {
    return (
      <div id="todoContainer" className="d-grid px-3">
        {todos &&
          todos.map((todo) => {
            return (
              <div
                key={todo.id}
                className="input-class d-flex align-items-center"
              >
                <input
                  className="me-1"
                  id={`todo${todo.id}`}
                  name="todo"
                  type="checkbox"
                />
                <label htmlFor={`todo${todo.id}`}>{todo.todo}</label>
              </div>
            );
          })}
      </div>
    );
  };

  const renderMessage = () => {
    return (
      <div className="message-div d-flex align-items-center justify-content-center">
        <h2 className="message fs-3">Login to see and create todos..</h2>
      </div>
    );
  };

  return (
    <div id="todo-back">{isSignedIn ? renderTodos() : renderMessage()}</div>
  );
};

export default TodoList;
