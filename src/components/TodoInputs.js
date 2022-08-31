import React, { useState } from "react";
import { connect } from "react-redux";
import { createTodo } from "../actions";
import "../style/body.css";

const TodoInputs = ({ createTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(value);
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
        <button className="ui submit button sub-button">Submit</button>
      </div>
    </form>
  );
};

export default connect(null, {
  createTodo,
})(TodoInputs);
