import { memo, ReactElement } from "react";
import { ArrowStateType } from "../../hooks/TodoHook";
import { HandleDivClassesType } from "../todos/TodoList";
import { ArrowType } from "../../features/classes/classesSlice";

interface LeftArrowPropTypes {
  state: Pick<
    ArrowStateType,
    "leftClick" | "leftHover" | "setLeftHover" | "handleLeftArrowClick"
  >;
  handleClasses: HandleDivClassesType;
  classes: ArrowType;
}

const LeftArrow = ({
  state,
  handleClasses,
  classes,
}: LeftArrowPropTypes): ReactElement => {
  const { setLeftHover, leftClick, leftHover, handleLeftArrowClick } = state;

  const div = handleClasses(
    leftHover,
    leftClick,
    classes?.div ? classes.div : ""
  );

  return (
    <div
      onMouseEnter={() => setLeftHover(true)}
      onMouseLeave={() => setLeftHover(false)}
      onClick={() => handleLeftArrowClick()}
      className={`arrow-div ${div}  rounded-pill d-flex align-items-center justify-content-center`}
      data-testid="left-arrow"
    >
      <i
        className={`location ${classes.arrow} ${
          leftHover && classes.div === "arrow-enabled" ? "arrow-hover" : ""
        } arrow icon arrow-left  pb-4 ms-1`}
      ></i>
    </div>
  );
};

export default memo(LeftArrow);
