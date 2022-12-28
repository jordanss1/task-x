import React from "react";

const RightArrow = ({ classes, handleClick, equation }) => {
  return (
    <div
      onClick={() => handleClick(equation)}
      className={`arrow-div ${classes.div} rounded-pill d-flex align-items-center justify-content-center`}
    >
      <i className={`location ${classes.arrow} arrow icon arrow-right`}></i>
    </div>
  );
};

export default RightArrow;
