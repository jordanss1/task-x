import { FormEvent, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../features/auth/authSlice";
import { AppThunkDispatch, createTodos } from "../../features/todos/todosSlice";
import { classSelector } from "../../features/classes/classesSlice";
import "../../style/body.css";
import { AnyAction, AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";

const TodoInputs = (): ReactElement => {
  const { isSignedIn, beenSignedIn } = useSelector(authSelector);
  const { form } = useSelector(classSelector);
  const [value, setValue] = useState<string>("");

  const dispatch = useDispatch<AppThunkDispatch>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    // Function to create Todo

    e.preventDefault();
    dispatch(createTodos(value));
    setValue("");
  };

  const hideForm = (): boolean => {
    // Hides form after classes finished

    if (!isSignedIn || !beenSignedIn) {
      return true;
    } else {
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
          data-testid="submit-button"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TodoInputs;
