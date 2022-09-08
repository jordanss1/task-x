import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTodos,
  editTodo,
  deleteTodo,
} from "../features/todos/todosSlice";
import { authSelector } from "../features/auth/authSlice";
import "../style/body.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const { isSignedIn } = useSelector(authSelector);

  const [promptValue, setPromptValue] = useState("");
  const [editId, setEditId] = useState(null);

  const handlePromptValue = (id) => {
    setPromptValue(prompt("Edit todo and submit"));
    setEditId(id);
  };

  const handleDeleteTodo = (id) => {
    const todoDiv = document.getElementById(id);
    const message = "Are you sure you want to delete this?";
    const confirmation = window.confirm(message);

    if (confirmation) {
      //todoDiv.remove();
      dispatch(deleteTodo(id));
    } else {
      return;
    }
  };

  useEffect(() => {
    if (promptValue && editId) {
      const editObject = { editId, promptValue };
      dispatch(editTodo(editObject));
    }
  }, [editId]);

  const renderTodos = () => {
    return (
      <React.Fragment>
        {todos &&
          todos.map(({ id, todo }) => {
            return (
              <div
                key={id}
                id={id}
                className="todo-class d-flex align-items-center justify-content-around"
              >
                <p className="todo-text ms-3 ms-sm-0 text-center">{todo}</p>
                <div className="ms-auto">
                  <i
                    className="opacity-75 icon-class bordered inverted black edit link icon"
                    title={id}
                    onClick={({ target }) =>
                      handlePromptValue(parseInt(target.title))
                    }
                  ></i>
                  <i
                    title={id}
                    className="opacity-75 icon-class delete-icon bordered inverted red close link icon"
                    onClick={({ target }) =>
                      handleDeleteTodo(parseInt(target.title))
                    }
                  ></i>
                </div>
              </div>
            );
          })}
      </React.Fragment>
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
    <div
      id="todoContainer"
      className="d-flex align-items-center flex-column px-3 py-3"
    >
      {isSignedIn ? renderTodos() : renderMessage()}
    </div>
  );
};

export default TodoList;
