import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RightArrow from "./Arrows/RightArrow";
import LeftArrow from "./Arrows/LeftArrow";
import {
  selectTodos,
  editTodo,
  deleteTodo,
} from "../features/todos/todosSlice";
import {
  todoContainerSet,
  loginContainerSet,
  todoItemSet,
  placeholderSet,
} from "../features/classes/classesSlice";
import { classSelector } from "../features/classes/classesSlice";
import { authSelector, setLoading } from "../features/auth/authSlice";
import "../style/body.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const { isSignedIn, beenSignedIn, beenSignedOut, loading } =
    useSelector(authSelector);
  const {
    initialClasses,
    todoContainer,
    loginContainer,
    todoItem,
    placeholder,
  } = useSelector(classSelector);

  const [promptValue, setPromptValue] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (beenSignedIn) {
      dispatch(loginContainerSet("signIn-container"));
      dispatch(placeholderSet("loading-ani"));
    }

    if (beenSignedOut) {
      dispatch(loginContainerSet("signOut-container"));
      dispatch(todoContainerSet("todos-out"));
    }
  }, [beenSignedIn, beenSignedOut]);

  useEffect(() => {
    let id;

    if (isSignedIn && !loading) {
      dispatch(setLoading(true));

      id = setTimeout(() => dispatch(setLoading(false)), 2500);
    }

    return () => clearTimeout(id);
  }, [isSignedIn]);

  useEffect(() => {
    if (isSignedIn && !loading) {
      dispatch(todoContainerSet("todos-in"));
    }
  }, [loading]);

  useEffect(() => {
    if (promptValue && editId) {
      const editObject = { editId, promptValue };
      dispatch(editTodo(editObject));
    }
  }, [editId]);

  useEffect(() => {
    let id;

    if (todoItem.id) {
      id = setTimeout(() => dispatch(todoItemSet({})), 500);
    }

    return () => clearTimeout(id);
  }, [todoItem]);

  const handlePromptValue = (id) => {
    setPromptValue(prompt("Edit todo and submit"));
    setEditId(id);
  };

  const handleDeleteTodo = (id) => {
    dispatch(todoItemSet({ id: id, classProp: "item-out" }));
    setTimeout(() => dispatch(deleteTodo(id)), 500);
  };

  const renderBody = () => {
    if (!isSignedIn) {
      const classes = `${initialClasses.container} ${loginContainer}`;

      return (
        <section
          className={`d-flex start-container ${classes} align-items-center w-100 flex-column px-3 py-3`}
        >
          <article className="message-div d-flex align-items-center justify-content-center ">
            <h2 className="message fs-3">Login to view and create todos..</h2>
          </article>
        </section>
      );
    } else if (isSignedIn && loading) {
      return (
        <section
          className={`placeholder-container ${placeholder} d-flex align-items-center justify-content-center w-50 message-div flex-column px-3 py-3`}
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
        </section>
      );
    } else if (isSignedIn && todos.length && !loading) {
      return (
        <section
          className={`todo-container2 ${todoContainer} p-3 d-flex justify-content-center flex-row align-items-center mt-2 justify-content-evenly`}
        >
          <LeftArrow />
          <div className="d-flex h-100 flex-column align-items-center todo-container1">
            {todos.map(({ id, todo }) => {
              return (
                <article
                  key={id}
                  className={`todo-class ${
                    todoItem.id === id ? todoItem.classProp : ""
                  } border rounded-pill p-1 d-flex align-items-center justify-content-around mb-2`}
                >
                  <p className="todo-text ms-3 ms-sm-0 ps-4 pt-2 fs-4">
                    {todo}
                  </p>
                  <div className="ms-auto">
                    <i
                      className="icon-class  rounded-pill bordered inverted black edit link icon"
                      onClick={() => handlePromptValue(id)}
                    ></i>
                    <i
                      className="icon-class delete-icon bordered  rounded-pill inverted red close link icon"
                      onClick={() => handleDeleteTodo(id)}
                    ></i>
                  </div>
                </article>
              );
            })}
          </div>
          <RightArrow />
        </section>
      );
    } else if (isSignedIn && !todos.length && !loading) {
      return (
        <section
          id="no-todos-container"
          className={`todo-container2 ${todoContainer} d-flex align-items-center justify-content-center`}
        >
          <div className="message-div no-todos d-flex align-items-center justify-content-center ">
            <h2 className="message fs-3">Start creating todos!</h2>
          </div>
        </section>
      );
    }
  };

  return renderBody();
};

export default TodoList;
