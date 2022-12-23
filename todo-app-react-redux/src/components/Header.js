import React, { useEffect } from "react";
import GoogleAuth from "./GoogleAuth";
import "../style/header.css";

const Header = () => {
  useEffect(() => {
    //initial render styles

    const icon = document.getElementsByClassName("todo-icon")[0];
    const logo = document.getElementsByClassName("todo-logo")[0];
    const heading = document.getElementsByClassName("todo-heading")[0];
    const container = document.getElementsByClassName("start-container")[0];
    const container2 = document.getElementsByClassName("header-container")[0];
    const button = document.getElementsByClassName("buttonSignIn")[0];

    button.classList.add("button-ani");
    container.classList.add("start-ani");
    container2.classList.add("border-ani");
    icon.classList.add("logo-icon");
    logo.classList.add("full-logo");
    heading.classList.add("logo-head");

    let id = setTimeout(() => {
      button.classList.remove("button-ani");
      container.classList.remove("start-ani");
      container2.classList.remove("border-ani");
      icon.classList.remove("logo-icon");
      logo.classList.remove("full-logo");
      heading.classList.remove("logo-head");
    }, 3000);

    return () => clearTimeout(id);
  }, []);

  return (
    <header>
      <div className="w-100 divider-1"></div>
      <div className="header-container container-fluid">
        <div className="d-flex todo-logo  flex-row justify-content-center">
          <i className="check square todo-icon outline icon mb-2 "></i>
          <h1 className="todo-heading ">Todo-List</h1>
        </div>
        <div className="signIn-div d-flex justify-content-center">
          <GoogleAuth />
        </div>
      </div>
    </header>
  );
};

export default Header;
