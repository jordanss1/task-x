import React from "react";

const RightArrow = ({
  classes,
  handleClick,
  handleHover,
  hover,
  click,
  handleClasses,
}) => {
  return (
    <div
      onMouseEnter={() => handleHover(true, false)}
      onMouseLeave={() => handleHover(false, false)}
      onClick={() => handleClick()}
      className={`arrow-div ${handleClasses(
        hover.right,
        click.right,
        classes.div
      )} rounded-pill d-flex align-items-center justify-content-center`}
    >
      <i
        className={`location ${classes.arrow} ${
          hover.right && classes.div === "arrow-enabled" ? "arrow-hover" : ""
        } arrow icon arrow-right`}
      ></i>
    </div>
  );
};

export default RightArrow;
