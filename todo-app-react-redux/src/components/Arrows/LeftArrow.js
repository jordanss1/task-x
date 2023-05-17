import React from "react";

const LeftArrow = ({ state, handleClasses, classes }) => {
  const { setLeftHover, leftClick, leftHover, handleLeftArrowClick } = state;
  const div = handleClasses(leftHover, leftClick, classes.div);
  return (
    <div
      onMouseEnter={() => setLeftHover(true)}
      onMouseLeave={() => setLeftHover(false)}
      onClick={() => handleLeftArrowClick()}
      className={`arrow-div ${div}  rounded-pill d-flex align-items-center justify-content-center`}
    >
      <i
        className={`location ${classes.arrow} ${
          leftHover && classes.div === "arrow-enabled" ? "arrow-hover" : ""
        } arrow icon arrow-left  pb-4 ms-1`}
      ></i>
    </div>
  );
};

export default LeftArrow;
