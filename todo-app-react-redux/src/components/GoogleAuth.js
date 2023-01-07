import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  signOut,
  signingIn,
  signingOut,
  setLoading,
  authSelector,
} from "../features/auth/authSlice";
import { getTodos, emptyTodos } from "../features/todos/todosSlice";
import {
  classSelector,
  signInButtonSet,
  signOutButtonSet,
  placeholderSet,
} from "../features/classes/classesSlice";
import { initialiseGoogle } from "../features/auth/initialiseGoogle";
import "../style/header.css";
import jwtDecode from "jwt-decode";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const { isSignedIn, userProfile, beenSignedIn, beenSignedOut } =
    useSelector(authSelector);
  const { initialClasses, signInButton, signOutButton } =
    useSelector(classSelector);

  const [google, setGoogle] = useState("");
  const divRef = useRef(null);

  useEffect(() => {
    // On page load, checks if the user is still logged in
    let id;
    setGoogle(window.google);

    const userObject = JSON.parse(window.localStorage.getItem("user"));

    if (userObject) {
      dispatch(setLoading(true));
      dispatch(signingIn());
      dispatch(signIn(userObject));

      id = setTimeout(() => {
        dispatch(placeholderSet(""));
        dispatch(setLoading(false));
      }, 2500);
    }

    return () => clearTimeout(id);
  }, [isSignedIn]);

  useEffect(() => {
    // Initializes the google sign-in button

    if (google && divRef.current) {
      initialiseGoogle(handleCallbackResponse, google);
    }
  }, [google, divRef.current]);

  useEffect(() => {
    // Fetches or removes todos depending on login status

    if (isSignedIn && userProfile) {
      dispatch(getTodos(userProfile.userId));
    } else {
      dispatch(emptyTodos());
    }
  }, [isSignedIn, userProfile]);

  useEffect(() => {
    // Animates the button containers when sign in begins
    let id;

    const userObject = JSON.parse(window.localStorage.getItem("user"));

    if (beenSignedIn && userObject) {
      dispatch(signInButtonSet("signInButton-out"));
      dispatch(signOutButtonSet("signOutButton-in"));

      id = setTimeout(() => {
        dispatch(signIn(userObject));
      }, 500);
    }

    return () => clearTimeout(id);
  }, [beenSignedIn]);

  useEffect(() => {
    // Animates the button containers when sign out begins

    let id;

    if (beenSignedOut) {
      dispatch(signOutButtonSet("signOutButton-out"));
      dispatch(signInButtonSet("signInButton-in"));

      id = setTimeout(() => {
        dispatch(signOut());
      }, 500);
    }

    return () => clearTimeout(id);
  }, [beenSignedOut]);

  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    window.localStorage.setItem("user", JSON.stringify(userObject));
    dispatch(signingIn());
  };

  const handleSignOut = () => {
    window.localStorage.removeItem("user");
    dispatch(signingOut());
  };

  const signInButtonClass = `${initialClasses.button} ${signInButton}`;

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
    <section className="w-100 d-flex justify-content-center">
      <div
        ref={divRef}
        className={`buttonSignIn ${signInButtonClass}`}
        hidden={!isSignedIn ? false : true}
      ></div>
      <section className={`d-flex buttonSignOut ${signOutButton}`}>
        {renderProfile()}
        {renderSignOutButton()}
      </section>
    </section>
  );
};

export default GoogleAuth;
