import { useMemo, useEffect, useCallback } from "react";
import ArrowLeftArrow from "../arrows/ArrowLeftArrow";
import ArrowRightArrow from "../arrows/ArrowRightArrow";
import TodoItem from "./TodoItem";
import { useTodosHook } from "../../hooks/TodoHook";
import { useSelector } from "react-redux";
import { classSelector } from "../../features/classes/classesSlice";
import { HandlePromptAndDeleteFunc } from "./TodoContainer";
import { TodoType } from "../../features/todos/todosSlice";

export type HandleDivClassesType = (
  hover: boolean,
  click: boolean,
  main: string
) => string;

const TodoListWithTodos = ({
  handlePromptValue,
  fullTodos,
}: {
  handlePromptValue: HandlePromptAndDeleteFunc;
  fullTodos: TodoType[];
}) => {
  const {
    todos,
    leftArrowState,
    rightArrowState,
    deleteLastTodo,
    deleteWhenMultipleTodos,
    indexes,
    length,
    handleArrowClasses,
  } = useTodosHook();
  const { todoContainer, actionedTodoItem, leftArrow, rightArrow } =
    useSelector(classSelector);

  const actionedTodo = useMemo(
    () => ({
      ...actionedTodoItem,
    }),
    [actionedTodoItem.id, actionedTodoItem.classProp]
  );

  useEffect(() => {
    let id: NodeJS.Timeout | number;
    // Below code "disables" the arrows depending on todos length and page

    id = handleArrowClasses();

    return () => clearTimeout(id);
  }, [length, indexes[0], indexes[1], actionedTodo]);

  // Manages the classes added to the arrows based on hover and click events

  const handleDivClasses = useCallback<HandleDivClassesType>(
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
    [rightArrowState, leftArrowState]
  );

  const handleDeleteTodo: HandlePromptAndDeleteFunc = (id) => {
    if (fullTodos && length && length > 1) {
      deleteWhenMultipleTodos(fullTodos, id);
    } else if (fullTodos && length === 1) {
      deleteLastTodo(id);
    }
  };

  const leftArrowClass = useMemo(
    () => ({
      ...leftArrow,
    }),
    [leftArrow.div, leftArrow.arrow]
  );

  const rightArrowClass = useMemo(
    () => ({
      ...rightArrow,
    }),
    [rightArrow.div, rightArrow.arrow]
  );

  return (
    <section
      className={`todo-container2 ${todoContainer} p-3 d-flex justify-content-center flex-row align-items-center mt-3 justify-content-evenly`}
    >
      <ArrowLeftArrow
        state={leftArrowState}
        classes={leftArrowClass}
        handleClasses={handleDivClasses}
      />
      <div className="d-flex h-100 flex-column align-items-center todo-container1">
        {todos?.map(({ id, todo }) => {
          return (
            <TodoItem
              key={id}
              id={id}
              todo={todo}
              actionedTodo={actionedTodo}
              handleDeleteTodo={handleDeleteTodo}
              handlePromptValue={handlePromptValue}
            />
          );
        })}
      </div>
      <ArrowRightArrow
        state={rightArrowState}
        classes={rightArrowClass}
        handleClasses={handleDivClasses}
      />
    </section>
  );
};

export default TodoListWithTodos;
