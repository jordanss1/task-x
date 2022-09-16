import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../features/auth/authSlice";
import { createTodos } from "../features/todos/todosSlice";
import "../style/body.css";

const TodoInputs = () => {
  const { isSignedIn, userProfile } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  let willDisableOrEnable = Boolean(isSignedIn) && Boolean(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTodos(value));
    setValue("");
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
        <button
          disabled={!willDisableOrEnable}
          className="ui submit button sub-button"
          id="submitBtn"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TodoInputs;
