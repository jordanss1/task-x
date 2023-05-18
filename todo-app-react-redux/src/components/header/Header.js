import React, { useEffect } from "react";
import GoogleAuth from "./GoogleAuth";
import { useSelector } from "react-redux";
import { classSelector } from "../../features/classes/classesSlice";
import "../../style/header.css";
import useClassesHook from "../../hooks/ClassesHooks";

const Header = () => {
  const { initialClasses } = useSelector(classSelector);
  const { initialClassesFunc } = useClassesHook();

  useEffect(() => {
    const id = initialClassesFunc();

    return () => clearTimeout(id);
  }, []);

  return (
    <header>
      <div className="w-100 divider-1"></div>
      <div
        className={`header-container ${initialClasses.border} container-fluid`}
      >
        <div
          className={`d-flex todo-logo ${initialClasses.logo} flex-row justify-content-center`}
        >
          <i
            className={`check square todo-icon ${initialClasses.icon} outline icon mb-2 `}
          ></i>
          <h1 className={`todo-heading ${initialClasses.heading}`}>
            Todo-List
          </h1>
        </div>
        <div className="signIn-div d-flex justify-content-center">
          <GoogleAuth />
        </div>
      </div>
    </header>
  );
};

export default Header;
