import React, { useEffect } from "react";
import "../style/header.css";
import jwtDecode from "jwt-decode";
// new API branch
// 600309209777-29sff65hsmud4j0gpt5icis5meaud1de.apps.googleusercontent.com

const GoogleAuth = () => {
  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    console.log(userObject);//change
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

  return (
    <div id="buttonSignIn">
      {/* <button id="button" className="ui labeled icon button">
        <div className="d-flex flex-row">
          <p className="mb-0">Sign-in with</p>
          <i className="google icon fs-4 pt-1 ps-2" />
        </div>
      </button>  */}
    </div>
  );
};

export default GoogleAuth;
