import React from "react";

const RightArrow = ({ state, handleClasses, classes }) => {
  const { setRightHover, rightClick, rightHover, handleRightArrowClick } =
    state;
  const div = handleClasses(rightHover, rightClick, classes.div);
  return (
    <div
      onMouseEnter={() => setRightHover(true)}
      onMouseLeave={() => setRightHover(false)}
      onClick={() => handleRightArrowClick()}
      className={`arrow-div ${div} rounded-pill d-flex align-items-center justify-content-center`}
    >
      <i
        className={`location ${classes.arrow} ${
          rightHover && classes.div === "arrow-enabled" ? "arrow-hover" : ""
        } arrow icon arrow-right`}
      ></i>
    </div>
  );
};

export default RightArrow;
