import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../features/auth/authSlice";
import { createTodos } from "../features/todos/todosSlice";
import "../style/body.css";

const TodoInputs = () => {
  const { isSignedIn, userProfile, beenSignedIn, beenSignedOut } =
    useSelector(authSelector);

  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTodos(value));
    setValue("");
  };

  const hidden = () => {
    if (!isSignedIn && !beenSignedIn) {
      return true;
    } else if (beenSignedIn || isSignedIn) {
      return false;
    }
  };

  const className = () => {
    if (beenSignedIn) {
      return "form-ani-signIn";
    } else if (beenSignedOut) {
      return "form-ani-signOut";
    }
  };

  return (
    <form
      className={`ui small d-flex form-container ${className()} form align-items-center justify-content-center w-50`}
      onSubmit={handleSubmit}
    >
      <div className="two fields mb-5 w-75 d-flex flex-column justify-content-evenly justify-content-center input-container rounded align-items-center">
        <div className="field w-75 input-div rounded-pill">
          <input
            hidden={hidden()}
            className="w-100 text-input rounded-pill"
            value={value}
            placeholder="Enter todo..."
            type="text"
            onChange={({ target }) => setValue(target.value)}
          />
        </div>
        <button
          hidden={hidden()}
          disabled={!value}
          className="ui submit button rounded-pill sub-button"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TodoInputs;
