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
        <div className="d-flex align-items-center me-3">
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

  const renderProfile = () => {
    return (
      <div className="d-flex justify-content-center me-5">
        {userProfile && userProfile.img && (
          <img className="img-profile me-1" src={`${userProfile.img}`}></img>
        )}
        {userProfile ? (
          <h2 className="fs-5 name-heading mb-0 d-flex align-items-center">{`Welcome, ${userProfile.name}`}</h2>
        ) : (
          ""
        )}
      </div>
    );
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
    <div className="w-100 d-flex justify-content-evenly">
      <div id="buttonSignIn" hidden={!isSignedIn ? false : true}></div>
      {renderProfile()}
      {renderSignOutButton()}
    </div>
  );
};

export default GoogleAuth;
