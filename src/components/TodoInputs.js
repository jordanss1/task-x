import React from "react";
import { connect } from "react-redux";
import "../style/body.css";

const TodoInputs = () => {
  return (
    <div
      className="ui small form d-flex align-items-center justify-content-center"
      id="form-container"
    >
      <div className="two fields mb-0 w-50 d-flex flex-column justify-content-evenly justify-content-center input-container align-items-center">
        <div className="field w-75">
          <input className="w-100" placeholder="Enter todo..." type="text" />
        </div>
        <div className="ui submit button sub-button">Submit</div>
      </div>
    </div>
  );
};

export default connect(null, {})(TodoInputs);
