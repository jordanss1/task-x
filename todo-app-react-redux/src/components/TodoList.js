import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTodos,
  editTodo,
  deleteTodo,
} from "../features/todos/todosSlice";
import {
  todoContainerSet,
  loginContainerSet,
  noTodosSet,
  holdId,
} from "../features/classes/classesSlice";
import { classSelector } from "../features/classes/classesSlice";
import { authSelector } from "../features/auth/authSlice";
import "../style/body.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const { isSignedIn, beenSignedIn, beenSignedOut } = useSelector(authSelector);
  const { initialClasses, todoContainer, loginContainer, noTodos, id } =
    useSelector(classSelector);

  const [promptValue, setPromptValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (beenSignedIn && !isSignedIn) {
      dispatch(loginContainerSet("signIn-container"));
    }

    if (beenSignedOut) {
      dispatch(loginContainerSet("signOut-container"));
    }

    if (beenSignedOut && todos.length) {
      dispatch(todoContainerSet("todos-out"));
    }

    if (beenSignedOut && !todos.length) {
      dispatch(noTodosSet("noTodos-out"));
    }
  }, [beenSignedIn, beenSignedOut]);

  useEffect(() => {
    let id;

    if (isSignedIn) {
      setLoading(true);

      id = setTimeout(() => {
        setLoading(false);

        dispatch(todoContainerSet("todos-in"));
        dispatch(noTodosSet("noTodos-in"));
      }, 2500);
    }

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
      const classes = `${initialClasses.container} ${loginContainer}`;

      return (
        <div
          className={`d-flex start-container ${classes} align-items-center w-100 flex-column px-3 py-3`}
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
      return (
        <div
          className={`todo-container2 ${todoContainer} p-3 d-flex flex-column align-items-center mt-2  justify-content-between `}
        >
          {todos.map(({ id, todo }) => {
            return (
              <div
                key={id}
                className={`todo-class todo${id} border rounded-pill p-1 d-flex align-items-center justify-content-around mb-2`}
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
          className={`no-todos ${noTodos} d-flex align-items-center flex-column px-3 py-3`}
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
