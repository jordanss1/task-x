import React from "react";

const LeftArrow = ({ classes, handleClick, equation, handleFocus }) => {
  return (
    <div
      // onFocus={() => }
      onClick={() => handleClick(equation)}
      className={`arrow-div arrow-div2 ${classes.div} ${classes.divHover} rounded-pill d-flex align-items-center justify-content-center`}
    >
      <i
        className={`location ${classes.arrow} ${classes.arrowHover} arrow icon arrow-left  pb-4 ms-1`}
      ></i>
    </div>
  );
};

export default LeftArrow;
