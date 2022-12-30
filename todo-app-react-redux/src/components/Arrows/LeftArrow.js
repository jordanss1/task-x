import React from "react";

const LeftArrow = ({
  classes,
  handleClick,
  handleHover,
  hover,
  click,
  handleClasses,
}) => {
  return (
    <div
      onMouseEnter={() => handleHover(false, true)}
      onMouseLeave={() => handleHover(false, false)}
      onClick={() => handleClick()}
      className={`arrow-div ${handleClasses(
        hover.left,
        click.left,
        classes.div
      )}  rounded-pill d-flex align-items-center justify-content-center`}
    >
      <i
        className={`location ${classes.arrow} ${
          hover.left && classes.div === "arrow-enabled" ? "arrow-hover" : ""
        } arrow icon arrow-left  pb-4 ms-1`}
      ></i>
    </div>
  );
};

export default LeftArrow;
