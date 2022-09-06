import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut, authSelector } from "../features/auth/authSlice";
import { getTodos, emptyTodos } from "../features/todos/todosSlice";
import { initialiseGoogle } from "../features/auth/initialiseGoogle";
import "../style/header.css";
import jwtDecode from "jwt-decode";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const { isSignedIn, userProfile } = useSelector(authSelector);

  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    window.localStorage.setItem("user", JSON.stringify(userObject));
    dispatch(signIn(userObject));
  };

  const handleSignOut = () => {
    dispatch(signOut());
    window.localStorage.removeItem("user");
  };

  const renderSignOutButton = () => {
    if (isSignedIn === true) {
      return (
        <div>
          <button
            id="button"
            onClick={handleSignOut}
            className="ui labeled icon button p-2"
          >
            <div className="d-flex justify-content-center flex-row">
              <p className="mb-0">Sign out</p>
              <i className="google icon fs-4 pt-1 ps-2" />
            </div>
          </button>
        </div>
      );
    }
  };

  useEffect(() => {
    const userObject = JSON.parse(window.localStorage.getItem("user"));

    initialiseGoogle(handleCallbackResponse);

    if (userObject) {
      dispatch(signIn(userObject));
    }
  }, []);

  useEffect(() => {
    if (isSignedIn && userProfile) {
      dispatch(getTodos(userProfile.userId));
    } else {
      dispatch(emptyTodos());
    }
  }, [isSignedIn]);

  return (
    <div>
      <div id="buttonSignIn" hidden={!isSignedIn ? false : true}></div>
      {renderSignOutButton()}
    </div>
  );
};

export default GoogleAuth;
