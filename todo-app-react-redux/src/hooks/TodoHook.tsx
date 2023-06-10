import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  classSelector,
  leftArrowSet,
  rightArrowSet,
  actionedTodoItemSet,
  todoContainerSet,
} from "../features/classes/classesSlice";
import {
  TodoType,
  selectTodos,
  deleteTodo,
  AppThunkDispatch,
} from "../features/todos/todosSlice";

type HandleArrowClassesType = () => NodeJS.Timeout | number;

type HandleArrowClickType = () => void;

export interface ArrowStateType {
  rightClick: boolean;
  rightHover: boolean;
  setRightHover: React.Dispatch<React.SetStateAction<boolean>>;
  handleRightArrowClick: HandleArrowClickType;
  leftClick: boolean;
  leftHover: boolean;
  setLeftHover: React.Dispatch<React.SetStateAction<boolean>>;
  handleLeftArrowClick: HandleArrowClickType;
}

export const useTodosHook = () => {
  const { actionedTodoItem } = useSelector(classSelector);
  const [leftHover, setLeftHover] = useState<boolean>(false);
  const [rightHover, setRightHover] = useState<boolean>(false);
  const [leftClick, setLeftClick] = useState<boolean>(false);
  const [rightClick, setRightClick] = useState<boolean>(false);
  const [indexes, setIndexes] = useState<number[]>([0, 6]);
  const [length, setLength] = useState<number | null>(null);
  const [deleted, setDeleted] = useState<boolean | null>(null);
  const [empty, setEmpty] = useState(false);
  const dispatch = useDispatch<AppThunkDispatch>();
  const { fullTodos } = useSelector(selectTodos);

  useEffect(() => {
    // Sets real length in order to trigger previous page if necessary
    if (fullTodos) setLength(fullTodos.length);
  }, [fullTodos, actionedTodoItem.classProp]);

  useEffect(() => {
    // Sets right arrow enabled if page added
    // Navigates to previous page if no more todos on current page and not on first page

    if (length && length % 6 === 0 && deleted) {
      setDeleted(false);
      setIndexes(indexes[0] !== 0 ? [indexes[0] - 6, indexes[1] - 6] : indexes);
    }
  }, [length, actionedTodoItem.classProp]);

  // Below code "disables" the arrows depending on todos length and page

  const handleArrowClasses: HandleArrowClassesType = () => {
    let id: NodeJS.Timeout | number = 0;

    if (indexes[0] === 0 && indexes[1] === 6) {
      id = setTimeout(
        () => dispatch(leftArrowSet({ arrow: "arrow-disabled" })),
        100
      );
    }

    if (indexes[0] !== 0 && indexes[1] !== 6) {
      id = setTimeout(
        () => dispatch(leftArrowSet({ div: "arrow-enabled" })),
        100
      );
    }

    if (length && length <= indexes[1]) {
      id = setTimeout(
        () => dispatch(rightArrowSet({ arrow: "arrow-disabled" })),
        100
      );
    }

    if (length && length > indexes[1]) {
      id = setTimeout(
        () => dispatch(rightArrowSet({ div: "arrow-enabled" })),
        100
      );
    }

    return id;
  };

  const handleLeftArrowClick: HandleArrowClickType = () => {
    // Left arrow works only if not on first page (indexes[0])

    if (indexes[0] !== 0) {
      setIndexes([indexes[0] - 6, indexes[1] - 6]);
      setLeftClick(true);
      setTimeout(() => setLeftClick(false), 100);
    }
  };

  const handleRightArrowClick: HandleArrowClickType = () => {
    // Right arrow works only if total todos id more than the last sliced todos index (indexes[1])

    if (length && length > indexes[1]) {
      setIndexes([indexes[0] + 6, indexes[1] + 6]);
      setRightClick(true);
      setTimeout(() => setRightClick(false), 100);
    }
  };

  const deleteTodoPromise = (id: number) =>
    new Promise((resolve) => resolve(dispatch(deleteTodo(id))));

  const deleteWhenMultipleTodos = (todos: TodoType[], id: number) => {
    dispatch(actionedTodoItemSet({ id: id, classProp: "item-out" }));

    setTimeout(async () => {
      await deleteTodoPromise(id);
      dispatch(actionedTodoItemSet({ id: null, classProp: null }));
      setDeleted(true);
      setLength(todos.length);
    }, 500);
  };

  const deleteLastTodo = (id: number) => {
    setDeleted(false);
    setEmpty(true);
    dispatch(actionedTodoItemSet({ id: id, classProp: "item-out" }));
    dispatch(todoContainerSet("todo-container-empty"));

    setTimeout(async () => {
      await deleteTodoPromise(id);
      setEmpty(false);
      dispatch(actionedTodoItemSet({ id: null, classProp: null }));
      dispatch(todoContainerSet(""));
    }, 1700);
  };

  let todos: TodoType[] | null = fullTodos
    ? fullTodos.slice(indexes[0], indexes[1])
    : null;

  const leftArrowState = useMemo(
    () => ({
      leftClick,
      leftHover,
      setLeftHover,
      handleLeftArrowClick,
    }),
    [leftClick, leftHover, setLeftHover, handleLeftArrowClick]
  );

  const rightArrowState = useMemo(
    () => ({
      rightClick,
      rightHover,
      setRightHover,
      handleRightArrowClick,
    }),
    [rightClick, rightHover, setRightHover, handleRightArrowClick]
  );

  return {
    empty,
    length,
    todos,
    fullTodos,
    handleArrowClasses,
    indexes,
    setIndexes,
    setDeleted,
    setLength,
    leftArrowState,
    rightArrowState,
    deleteLastTodo,
    deleteWhenMultipleTodos,
  };
};
