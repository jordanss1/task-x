import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../features/auth/authSlice";
import { createTodos } from "../../features/todos/todosSlice";
import {
  classSelector,
  formClassSet,
} from "../../features/classes/classesSlice";
import "../../style/body.css";

const TodoInputs = () => {
  const { isSignedIn, beenSignedIn, beenSignedOut } = useSelector(authSelector);
  const { form } = useSelector(classSelector);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // Add classes to form

    if (beenSignedIn) {
      dispatch(formClassSet("form-ani-signIn"));
    } else if (beenSignedOut) {
      dispatch(formClassSet("form-ani-signOut"));
    }
  }, [beenSignedIn, beenSignedOut]);

  const handleSubmit = (e) => {
    // Function to create Todo

    e.preventDefault();
    dispatch(createTodos(value));
    setValue("");
  };

  const hideForm = () => {
    // Hides form after classes finished

    if (!isSignedIn && !beenSignedIn) {
      return true;
    } else if (beenSignedIn || isSignedIn) {
      return false;
    }
  };

  return (
    <form
      className={`ui small d-flex form-container ${form} form align-items-center justify-content-center w-50`}
      onSubmit={handleSubmit}
    >
      <div className="two fields mb-5 w-75 d-flex flex-column justify-content-evenly justify-content-center input-container rounded align-items-center">
        <div className="field w-75 input-div rounded-pill">
          <input
            hidden={hideForm()}
            className="w-100 text-input rounded-pill"
            value={value}
            placeholder="Enter todo..."
            type="text"
            onChange={({ target }) => setValue(target.value)}
          />
        </div>
        <button
          hidden={hideForm()}
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
