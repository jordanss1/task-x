import { useEffect, useState, useCallback, ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import RightArrow from "../arrows/ArrowRightArrow";
import LeftArrow from "../arrows/ArrowLeftArrow";
import {
  editTodo,
  deleteTodo,
  getTodos,
  AppThunkDispatch,
} from "../../features/todos/todosSlice";
import {
  todoContainerSet,
  actionedTodoItemSet,
} from "../../features/classes/classesSlice";
import { classSelector } from "../../features/classes/classesSlice";
import { authSelector } from "../../features/auth/authSlice";
import "../../style/body.css";
import TodoItem from "./TodoItem";
import { useTodosHook } from "../../hooks/TodoHook";
import TodoPlaceholder from "./TodoPlaceholder";

export type HandlePromptAndDeleteFunc = (id: number) => void;

export type HandleDivClassesType = (
  hover: boolean,
  click: boolean,
  main: string
) => string;

const TodoList = (): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const { isSignedIn, loading, userProfile } = useSelector(authSelector);
  const {
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
    leftArrowState,
    rightArrowState,
    setDeleted,
    setLength,
    length,
  } = useTodosHook();

  const [promptValue, setPromptValue] = useState<string | null>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    let id: NodeJS.Timeout | number;
    // Class added after loading is complete

    if (isSignedIn && !loading && !empty) {
      dispatch(todoContainerSet("todos-in"));
    }

    // Below code "disables" the arrows depending on todos length and page

    id = handleArrowClasses();

    return () => clearTimeout(id);
  }, [loading, actionedTodoItem, length, indexes]);

  useEffect(() => {
    // Updates todo item

    if (promptValue && editId) {
      const editObject = { editId, promptValue };
      dispatch(editTodo(editObject));
    }
  }, [editId, promptValue]);

  const handlePromptValue: HandlePromptAndDeleteFunc = (id) => {
    setPromptValue(prompt("Edit todo and submit"));
    setEditId(id);
  };

  const handleDeleteTodo: HandlePromptAndDeleteFunc = (id) => {
    // The different conditions handle adding appropriate classes when all todos are deleted
    // Smooth transition between containers

    const promise = () =>
      new Promise((resolve) => resolve(dispatch(deleteTodo(id))));

    if (fullTodos && fullTodos.length > 1) {
      dispatch(actionedTodoItemSet({ id: id, classProp: "item-out" }));

      setTimeout(async () => {
        await promise();
        dispatch(actionedTodoItemSet({ id: null, classProp: null }));
        setDeleted(true);
        setLength(fullTodos.length);
      }, 500);
    } else if (fullTodos && fullTodos.length === 1) {
      setDeleted(false);
      setEmpty(true);
      dispatch(actionedTodoItemSet({ id: id, classProp: "item-out" }));
      dispatch(todoContainerSet("todo-container-empty"));

      setTimeout(async () => {
        await promise();
        setEmpty(false);
        dispatch(actionedTodoItemSet({ id: null, classProp: null }));
        dispatch(todoContainerSet(""));
      }, 1700);
    }
  };

  // Manages the classes added to the arrows based on hover and click events

  const handleDivClasses: HandleDivClassesType = useCallback(
    (hover, click, main) => {
      if (hover && !click && main === "arrow-enabled") {
        return "arrow-div-hover";
      }
      if (!hover && !click) {
        return main;
      }
      if (click && main === "arrow-enabled") {
        return "arrow-click";
      }
      return "";
    },
    [rightArrowState, leftArrowState, rightArrow, leftArrow]
  );

  // Login page when not signed in

  if (!isSignedIn) {
    return (
      <section
        className={`d-flex start-container ${loginContainer} align-items-center w-100 flex-column px-3 py-3`}
      >
        <article className="message-div d-flex align-items-center justify-content-center ">
          <h2 className="message fs-3">Login to view and create todos..</h2>
        </article>
      </section>
    );
  } else if (isSignedIn && fullTodos?.length && !loading) {
    // After loading is complete and when todos exist

    return (
      <section
        className={`todo-container2 ${todoContainer} p-3 d-flex justify-content-center flex-row align-items-center mt-3 justify-content-evenly`}
      >
        <LeftArrow
          state={leftArrowState}
          classes={leftArrow}
          handleClasses={handleDivClasses}
        />
        <div className="d-flex h-100 flex-column align-items-center todo-container1">
          {todos?.map(({ id, todo }) => {
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
  } else if (isSignedIn && !fullTodos?.length && !loading) {
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
  } else if (isSignedIn && loading && placeholder) {
    // Loading placeholder page while requesting from API

    return <TodoPlaceholder placeholder={placeholder} />;
  } else {
    return <TodoPlaceholder placeholder={placeholder} />;
  }
};

export default TodoList;
