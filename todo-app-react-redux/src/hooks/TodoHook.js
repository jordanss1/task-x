import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { leftArrowSet, rightArrowSet } from "../features/classes/classesSlice";
import { selectTodos } from "../features/todos/todosSlice";

export const useTodosHook = () => {
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const [leftClick, setLeftClick] = useState(false);
  const [rightClick, setRightClick] = useState(false);
  const [indexes, setIndexes] = useState([0, 6]);
  const dispatch = useDispatch();
  const { fullTodos } = useSelector(selectTodos);

  // Below code "disables" the arrows depending on todos length and page

  const handleArrowClasses = () => {
    let id;

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

    if (fullTodos.length < indexes[1] + 1) {
      id = setTimeout(
        () => dispatch(rightArrowSet({ arrow: "arrow-disabled" })),
        100
      );
    }

    if (fullTodos.length > indexes[1]) {
      id = setTimeout(
        () => dispatch(rightArrowSet({ div: "arrow-enabled" })),
        100
      );
    }

    return id;
  };

  const handleLeftArrowClick = () => {
    // Left arrow works only if not on first page (indexes[0])

    if (indexes[0] !== 0) {
      setIndexes([indexes[0] - 6, indexes[1] - 6]);
      setLeftClick(true);
      setTimeout(() => setLeftClick(false), 100);
    }
  };

  const handleRightArrowClick = () => {
    // Right arrow works only if total todos id more than the last sliced todos index (indexes[1])

    if (fullTodos.length > indexes[1]) {
      setIndexes([indexes[0] + 6, indexes[1] + 6]);
      setRightClick(true);
      setTimeout(() => setRightClick(false), 100);
    }
  };

  let todos = fullTodos.slice(indexes[0], indexes[1]);

  const leftArrowState = {
    leftClick,
    leftHover,
    setLeftHover,
    handleLeftArrowClick,
  };

  const rightArrowState = {
    rightClick,
    rightHover,
    setRightHover,
    handleRightArrowClick,
  };

  return {
    todos,
    fullTodos,
    handleArrowClasses,
    indexes,
    setIndexes,
    leftArrowState,
    rightArrowState,
  };
};
