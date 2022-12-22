import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../features/auth/authSlice";
import { createTodos } from "../features/todos/todosSlice";
import "../style/body.css";

const TodoInputs = () => {
  const { isSignedIn, userProfile } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTodos(value));
    setValue("");
  };

  return (
    <form
      className="ui small form-container form align-items-center justify-content-center w-50"
      onSubmit={handleSubmit}
    >
      <div className="two fields mb-0 w-100 d-flex flex-column justify-content-evenly justify-content-center input-container align-items-center">
        <div className="field w-75">
          <input
            className="w-100"
            value={value}
            placeholder="Enter todo..."
            type="text"
            onChange={({ target }) => setValue(target.value)}
          />
        </div>
        <button
          disabled={!value}
          className="ui submit button rounded-pill sub-button"
          id="submitBtn"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TodoInputs;
