import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "../features/auth";
import { authState } from "../features/auth";
import "../style/header.css";
import jwtDecode from "jwt-decode";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(authState);

  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    dispatch(signIn(userObject));
  };

  const handleSignOut = () => {
    signOut();
  };

  const renderSignOutButton = () => {
    if (isSignedIn === true) {
      return (
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
      );
    }
  };

  useEffect(() => {
    /* global google */
    const google = window.google;
    if (google) {
      google.accounts.id.initialize({
        client_id:
          "600309209777-29sff65hsmud4j0gpt5icis5meaud1de.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("buttonSignIn"), {
        shape: "circle",
        size: "medium",
        type: "standard",
      });
    }
  }, []);

  console.log(isSignedIn);

  return (
    <div>
      <div id="buttonSignIn" hidden={!isSignedIn ? false : true}></div>
      {renderSignOutButton()}
    </div>
  );
};

export default GoogleAuth;
