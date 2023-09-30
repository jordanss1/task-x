import { memo, ReactElement } from "react";
import { ArrowStateType } from "../../hooks/TodoHook";
import { HandleDivClassesType } from "../todos/TodoListWithTodos";
import { ArrowType } from "../../features/classes/classesSlice";

interface RightArrowPropTypes {
  state: Pick<
    ArrowStateType,
    "rightClick" | "rightHover" | "setRightHover" | "handleRightArrowClick"
  >;
  handleClasses: HandleDivClassesType;
  classes: ArrowType;
}

const RightArrow = ({
  state,
  handleClasses,
  classes,
}: RightArrowPropTypes): ReactElement => {
  const { setRightHover, rightClick, rightHover, handleRightArrowClick } =
    state;

  const div = handleClasses(
    rightHover,
    rightClick,
    classes?.div ? classes.div : ""
  );

  return (
    <div
      onMouseEnter={() => setRightHover(true)}
      onMouseLeave={() => setRightHover(false)}
      onClick={() => handleRightArrowClick()}
      className={`arrow-div ${div} rounded-pill d-flex align-items-center justify-content-center`}
      data-testid="right-arrow"
    >
      <i
        className={`location ${classes?.arrow} ${
          rightHover && classes?.div === "arrow-enabled" ? "arrow-hover" : ""
        } arrow icon arrow-right`}
      ></i>
    </div>
  );
};

export default memo(RightArrow);
