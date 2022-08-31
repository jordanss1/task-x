import React, { useState } from "react";
import { connect } from "react-redux";
import { createTodo } from "../actions";
import "../style/body.css";

const TodoInputs = () => {
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {
    console.log(value);
  };

  return (
    <form
      className="ui small form d-flex align-items-center justify-content-center"
      id="form-container"
      onSubmit={handleSubmit}
    >
      <div className="two fields mb-0 w-50 d-flex flex-column justify-content-evenly justify-content-center input-container align-items-center">
        <div className="field w-75">
          <input
            className="w-100"
            value={value}
            placeholder="Enter todo..."
            type="text"
            onChange={({ target }) => setValue(target.value)}
          />
        </div>
        <div className="ui submit button sub-button">Submit</div>
      </div>
    </form>
  );
};

export default connect(null, {
  createTodo,
})(TodoInputs);
