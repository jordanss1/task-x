import React, { useState } from "react";
import { connect } from "react-redux";
import { createTodo } from "../actions";
import "../style/body.css";

const TodoInputs = ({ createTodo, isSignedIn }) => {
  const [value, setValue] = useState("");
  let errorClass = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignedIn === null) {
      errorClass = "ui input error";
    } else {
      createTodo(value);
    }
  };

  return (
    <form
      className="ui small form d-flex align-items-center justify-content-center"
      id="form-container"
      onSubmit={handleSubmit}
    >
      <div className="two fields mb-0 w-50 d-flex flex-column justify-content-evenly justify-content-center input-container align-items-center">
        <div className={`${errorClass} field w-75`}>
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

const mapStateToProps = ({ auth }) => {
  return {
    isSignedIn: auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  createTodo,
})(TodoInputs);
