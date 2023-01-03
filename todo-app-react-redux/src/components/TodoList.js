import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import RightArrow from "./Arrows/RightArrow";
import LeftArrow from "./Arrows/LeftArrow";
import {
  selectTodos,
  editTodo,
  deleteTodo,
  organiseTodos,
} from "../features/todos/todosSlice";
import {
  todoContainerSet,
  loginContainerSet,
  todoItemSet,
  placeholderSet,
  leftArrowSet,
  rightArrowSet,
  setHover,
  setClick,
} from "../features/classes/classesSlice";
import { classSelector } from "../features/classes/classesSlice";
import { authSelector, setLoading } from "../features/auth/authSlice";
import "../style/body.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, slicedTodos } = useSelector(selectTodos);
  const { isSignedIn, beenSignedIn, beenSignedOut, loading } =
    useSelector(authSelector);
  const {
    initialClasses,
    todoContainer,
    loginContainer,
    todoItem,
    placeholder,
    leftArrow,
    rightArrow,
    hover,
    click,
  } = useSelector(classSelector);

  const [promptValue, setPromptValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [deleted, setDeleted] = useState(null);
  const [length, setLength] = useState(null);

  useEffect(() => {
    // Classes added when sign-in/out buttons are pressed

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
    // Class added after loading is complete

    if (isSignedIn && !loading && !empty) {
      dispatch(todoContainerSet("todos-in"));
    }

    // Below code "disables" the arrows depending on todos length and page

    const todoPortion = (num1, num2) =>
      slicedTodos[0] === num1 && slicedTodos[1] === num2;

    if (todoPortion(0, 6)) {
      id = setTimeout(
        () => dispatch(leftArrowSet({ arrow: "arrow-disabled" })),
        100
      );
    }

    if (!todoPortion(0, 6)) {
      id = setTimeout(
        () => dispatch(leftArrowSet({ div: "arrow-enabled" })),
        100
      );
    }

    if (todos.length > slicedTodos[1]) {
      id = setTimeout(
        () => dispatch(rightArrowSet({ div: "arrow-enabled" })),
        100
      );
    }

    if (todos.length < slicedTodos[1] + 1) {
      id = setTimeout(
        () => dispatch(rightArrowSet({ arrow: "arrow-disabled" })),
        100
      );
    }

    return () => clearTimeout(id);
  }, [loading, todoItem, slicedTodos, empty]);

  useEffect(() => {
    // Sets right arrow enabled if page added
    // Sets real length in order to trigger previous page if necessary

    let id;

    if (todos.length > slicedTodos[1]) {
      id = setTimeout(
        () => dispatch(rightArrowSet({ div: "arrow-enabled" })),
        100
      );
    }

    if (deleted) {
      setLength(todos.length);
    }

    return () => clearTimeout(id);
  }, [todos, deleted]);

  useEffect(() => {
    // Sets previous page if no more todos on current page

    if (length % 6 === 0 && deleted) {
      dispatch(organiseTodos([slicedTodos[0] - 6, slicedTodos[1] - 6]));
      setDeleted(false);
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

  console.log(deleted);
  const handleDeleteTodo = (id) => {
    // The different conditions handle adding appropriate classes when all todos are deleted
    // Smooth transition between containers

    if (todos.length > 1) {
      dispatch(todoItemSet({ id: id, classProp: "item-out" }));

      setTimeout(() => {
        dispatch(todoItemSet({}));
        dispatch(deleteTodo(id));
        setDeleted(true);
      }, 500);
    } else if (todos.length === 1) {
      setDeleted(false);
      setEmpty(true);
      dispatch(todoItemSet({ id: id, classProp: "item-out" }));
      dispatch(todoContainerSet("todo-container-empty"));

      setTimeout(() => {
        setEmpty(false);
        dispatch(todoItemSet({}));
        dispatch(todoContainerSet(""));
        dispatch(deleteTodo(id));
      }, 1700);
    }
  };

  // These next functions deal with the logic of the arrows because they are stateless components

  const handleLeftArrowClick = useCallback(() => {
    dispatch(organiseTodos([slicedTodos[0] - 6, slicedTodos[1] - 6]));
    dispatch(setClick({ left: true, right: false }));
    setTimeout(() => dispatch(setClick({ left: false, right: false })), 100);
  }, [slicedTodos]);

  const handleRightArrowClick = useCallback(() => {
    dispatch(organiseTodos([slicedTodos[0] + 6, slicedTodos[1] + 6]));
    dispatch(setClick({ left: false, right: true }));
    setTimeout(() => dispatch(setClick({ left: false, right: false })), 100);
  }, [slicedTodos]);

  const classArrowsFunc = (hover, click, main) => {
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
    } else if (isSignedIn && todos.length && !loading) {
      // After loading is complete and when todos exist

      return (
        <section
          className={`todo-container2 ${todoContainer} p-3 d-flex justify-content-center flex-row align-items-center mt-2 justify-content-evenly`}
        >
          <LeftArrow
            handleClasses={classArrowsFunc}
            click={click}
            handleHover={(right, left) =>
              dispatch(setHover({ right: right, left: left }))
            }
            hover={hover}
            classes={leftArrow}
            handleClick={slicedTodos[0] === 0 ? () => {} : handleLeftArrowClick}
          />
          <div className="d-flex h-100 flex-column align-items-center todo-container1">
            {todos.slice(slicedTodos[0], slicedTodos[1]).map(({ id, todo }) => {
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
                  <div className="ms-auto icon-holder">
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
          <RightArrow
            handleClasses={classArrowsFunc}
            click={click}
            handleHover={(right, left) =>
              dispatch(setHover({ right: right, left: left }))
            }
            hover={hover}
            classes={rightArrow}
            handleClick={
              todos.length > slicedTodos[1] ? handleRightArrowClick : () => {}
            }
          />
        </section>
      );
    } else if (isSignedIn && !todos.length && !loading) {
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
