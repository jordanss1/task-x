import React, { useEffect } from "react";
import "../style/header.css";
import jwtDecode from "jwt-decode";

// 600309209777-29sff65hsmud4j0gpt5icis5meaud1de.apps.googleusercontent.com

const GoogleAuth = () => {
  useEffect(() => {}, []);

  return (
    <button id="button" className="ui labeled icon button">
      <div className="d-flex flex-row">
        <p className="mb-0">Sign-in with</p>
        <i className="google icon fs-4 pt-1 ps-2" />
      </div>
    </button>
  );
};

export default GoogleAuth;
