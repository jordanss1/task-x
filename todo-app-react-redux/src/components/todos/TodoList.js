import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import RightArrow from "../arrows/RightArrow";
import LeftArrow from "../arrows/LeftArrow";
import {
  selectTodos,
  editTodo,
  deleteTodo,
} from "../../features/todos/todosSlice";
import {
  todoContainerSet,
  actionedTodoItemSet,
  rightArrowSet,
} from "../../features/classes/classesSlice";
import { classSelector } from "../../features/classes/classesSlice";
import { authSelector } from "../../features/auth/authSlice";
import "../../style/body.css";
import TodoItem from "./TodoItem";
import { useTodosHook } from "../../hooks/TodoHook";

const TodoList = () => {
  const dispatch = useDispatch();
  const { isSignedIn, loading } = useSelector(authSelector);
  const {
    initialClasses,
    todoContainer,
    loginContainer,
    actionedTodoItem,
    placeholder,
    leftArrow,
    rightArrow,
  } = useSelector(classSelector);

  const {
    fullTodos,
    todos,
    indexes,
    handleArrowClasses,
    setIndexes,
    leftArrowState,
    rightArrowState,
  } = useTodosHook();

  const [promptValue, setPromptValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [deleted, setDeleted] = useState(null);
  const [length, setLength] = useState(null);

  useEffect(() => {
    let id;
    // Class added after loading is complete

    if (isSignedIn && !loading && !empty) {
      dispatch(todoContainerSet("todos-in"));
    }

    // Below code "disables" the arrows depending on todos length and page

    id = handleArrowClasses();

    return () => clearTimeout(id);
  }, [loading, actionedTodoItem, indexes, empty, deleted]);

  useEffect(() => {
    // Sets right arrow enabled if page added
    // Sets real length in order to trigger previous page if necessary

    let id;

    if (fullTodos.length >= indexes[1]) {
      id = setTimeout(
        () => dispatch(rightArrowSet({ div: "arrow-enabled" })),
        100
      );
    }

    if (deleted) {
      setLength(fullTodos.length);
    }

    return () => clearTimeout(id);
  }, [deleted, actionedTodoItem]);

  useEffect(() => {
    // Sets previous page if no more todos on current page

    if (length % 6 === 0 && deleted) {
      setDeleted(false);
      setIndexes(indexes[0] !== 0 ? [indexes[0] - 6, indexes[1] - 6] : indexes);
    }
  }, [length]);

  useEffect(() => {
    // Updates todo item

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
    // The different conditions handle adding appropriate classes when all todos are deleted
    // Smooth transition between containers

    if (fullTodos.length > 1) {
      dispatch(actionedTodoItemSet({ id: id, classProp: "item-out" }));

      setTimeout(() => {
        dispatch(actionedTodoItemSet({}));
        dispatch(deleteTodo(id));
        setDeleted(true);
      }, 300);
    } else if (fullTodos.length === 1) {
      setDeleted(false);
      setEmpty(true);
      dispatch(actionedTodoItemSet({ id: id, classProp: "item-out" }));
      dispatch(todoContainerSet("todo-container-empty"));

      setTimeout(() => {
        setEmpty(false);
        dispatch(actionedTodoItemSet({}));
        dispatch(todoContainerSet(""));
        dispatch(deleteTodo(id));
      }, 1700);
    }
  };

  // These next functions deal with the logic of the arrows because they are stateless components

  const handleDivClasses = (hover, click, main) => {
    if (hover && !click && main === "arrow-enabled") {
      return "arrow-div-hover";
    }
    if (!hover && !click) {
      return main;
    }
    if (click && main === "arrow-enabled") {
      return "arrow-click";
    }
  };

  const renderBody = () => {
    // Login page when not signed in

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
    } else if (isSignedIn && loading && placeholder) {
      // Loading placeholder page while requesting from API

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
    } else if (isSignedIn && fullTodos.length && !loading) {
      // After loading is complete and when todos exist

      return (
        <section
          className={`todo-container2 ${todoContainer} p-3 d-flex justify-content-center flex-row align-items-center mt-2 justify-content-evenly`}
        >
          <LeftArrow
            state={leftArrowState}
            classes={leftArrow}
            handleClasses={handleDivClasses}
          />
          <div className="d-flex h-100 flex-column align-items-center todo-container1">
            {todos.map(({ id, todo }) => {
              return (
                <TodoItem
                  key={id}
                  id={id}
                  todo={todo}
                  actionedTodo={actionedTodoItem}
                  handleDeleteTodo={handleDeleteTodo}
                  handlePromptValue={handlePromptValue}
                />
              );
            })}
          </div>
          <RightArrow
            state={rightArrowState}
            classes={rightArrow}
            handleClasses={handleDivClasses}
          />
        </section>
      );
    } else if (isSignedIn && !fullTodos.length && !loading) {
      // After loading is complete and when todos don't exist

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
