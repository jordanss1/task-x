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
  const { isSignedIn, beenSignedIn, beenSignedOut } = useSelector(authSelector);

  const [promptValue, setPromptValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(null);

  const classFunc = (classes) => {
    if (beenSignedIn) {
      return classes[0];
    } else if (beenSignedOut) {
      return classes[1];
    }
  };

  const timeoutClassFunc = (classes) => {
    if (beenSignedIn) {
      setTimeout(() => {
        return classes[0];
      }, 2500);
    } else if (beenSignedOut) {
      return classes[1];
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      setLoading(true);
    }

    const id = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(id);
  }, [isSignedIn]);

  useEffect(() => {
    if (promptValue && editId) {
      const editObject = { editId, promptValue };
      dispatch(editTodo(editObject));
    }
  }, [editId]);

  const handlePromptValue = (id) => {
    setPromptValue(prompt("Edit todo and submit"));
    setEditId(id);
  };

  const handleDeleteTodo = (id) => {
    const message = "Are you sure you want to delete this?";
    const confirmation = window.confirm(message);

    if (confirmation) {
      dispatch(deleteTodo(id));
    }
  };

  const renderBody = () => {
    if (!isSignedIn) {
      const classes = ["signIn-container", "signOut-container"];

      return (
        <div
          className={`d-flex start-container ${classFunc(
            classes
          )} align-items-center w-100 flex-column px-3 py-3`}
        >
          <div className="message-div d-flex align-items-center justify-content-center ">
            <h2 className="message fs-3">Login to view and create todos..</h2>
          </div>
        </div>
      );
    } else if (isSignedIn && loading) {
      return (
        <div
          id="placeholder"
          className="d-flex align-items-center justify-content-center w-50 message-div flex-column px-3 py-3"
        >
          <div className="ui placeholder w-100">
            <div className="paragraph">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="paragraph">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      );
    } else if (isSignedIn && todos.length && !loading) {
      const containerClasses = ["todos-in", "todos-out"];
      const itemClasses = ["item-in", "item-out"];

      return (
        <div
          className={`todo-container2 p-3 ${timeoutClassFunc(
            containerClasses
          )} d-flex flex-column align-items-center mt-2  justify-content-between `}
        >
          {todos.map(({ id, todo }) => {
            return (
              <div
                key={id}
                className={`todo-class ${timeoutClassFunc(
                  itemClasses
                )} border rounded-pill p-1 d-flex align-items-center justify-content-around mb-2`}
              >
                <p className="todo-text ms-3 ms-sm-0 ps-2 fs-4">{todo}</p>
                {/* <div className="ms-auto">
                  <i
                    className="opacity-75 icon-class bordered inverted black edit link icon"
                    onClick={() => handlePromptValue(id)}
                  ></i>
                  <i
                    className="opacity-75 icon-class delete-icon bordered inverted red close link icon"
                    onClick={() => handleDeleteTodo(id)}
                  ></i>
                </div> */}
              </div>
            );
          })}
        </div>
      );
    } else if (isSignedIn && !todos.length && !loading && !beenSignedOut) {
      return (
        <div
          id="no-todos"
          className="d-flex align-items-center flex-column px-3 py-3"
        >
          <div className="message-div no-todos d-flex align-items-center justify-content-center ">
            <h2 className="message fs-3">Start creating todos!</h2>
          </div>
        </div>
      );
    }
  };

  return renderBody();
};

export default TodoList;
