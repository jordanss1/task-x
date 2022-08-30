import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import "../style/header.css";
import jwtDecode from "jwt-decode";

const GoogleAuth = ({ isSignedIn, signIn, signOut, userProfile }) => {
  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    signIn(userObject);
  };

  const renderSignOutButton = () => {
    if (!isSignedIn) {
      return;
    } else if (isSignedIn === true) {
      return (
        <button id="button" className="ui labeled icon button">
          <div className="d-flex flex-row">
            <p className="mb-0">Sign-out</p>
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

  return <div id="buttonSignIn"></div>;
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userProfile: state.auth.userProfile,
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
