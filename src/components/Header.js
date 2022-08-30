import React from "react";
import GoogleAuth from "./GoogleAuth";
import "../style/header.css";

const Header = () => {
  return (
    <div>
      <div className="w-100 divider-1"></div>
      <div className="header-container container-fluid">
        <div className="d-flex flex-row justify-content-center">
          <i className="check square outline icon mb-2 fs-3"></i>
          <h1 className="fs-3 ">Todo-List</h1>
        </div>
        <div className="d-flex justify-content-center">
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Header;
