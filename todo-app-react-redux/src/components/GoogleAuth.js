import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut, authSelector } from "../features/auth/authSlice";
import { getTodos, emptyTodos } from "../features/todos/todosSlice";
import { initialiseGoogle } from "../features/auth/initialiseGoogle";
import "../style/header.css";
import jwtDecode from "jwt-decode";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const { isSignedIn, userProfile } = useSelector(authSelector);
  const [google, setGoogle] = useState("");
  const [beenSignedOut, setBeenSignedOut] = useState(null);

  useEffect(() => {
    const button = document.getElementsByClassName("buttonSignIn")[0];
    button.classList.add("button-ani");
    setGoogle(window.google);

    const userObject = JSON.parse(window.localStorage.getItem("user"));

    if (userObject) {
      dispatch(signIn(userObject));
    }

    const id = setTimeout(() => button.classList.remove("button-ani"), 3000);

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (google) {
      initialiseGoogle(handleCallbackResponse, google);
    }
  }, [google]);

  useEffect(() => {
    if (isSignedIn && userProfile) {
      dispatch(getTodos(userProfile.userId));
      setBeenSignedOut(false);
    } else {
      dispatch(emptyTodos());
    }
  }, [isSignedIn, userProfile]);

  useEffect(() => {
    const startContainer =
      document.getElementsByClassName("start-container")[0];

    if (beenSignedOut && startContainer) {
      startContainer.classList.add("signOut-ani");
    }
  }, [beenSignedOut]);

  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    window.localStorage.setItem("user", JSON.stringify(userObject));
    dispatch(signIn(userObject));
  };

  const handleSignOut = () => {
    setTimeout(() => {
      dispatch(signOut());
      window.localStorage.removeItem("user");
      setBeenSignedOut(true);
    }, 1000);
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
          <img
            className="img-profile me-sm-1 me-2 rounded-circle"
            src={`${userProfile.img}`}
          ></img>
        )}
        {userProfile ? (
          <h2 className="fs-5 name-heading mb-0 d-flex align-items-center">{`Hi, ${userProfile.name}`}</h2>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="buttonSignIn" hidden={!isSignedIn ? false : true}></div>
      {renderProfile()}
      {renderSignOutButton()}
    </div>
  );
};

export default GoogleAuth;
