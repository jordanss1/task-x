import React, { useEffect } from "react";
import GoogleAuth from "./GoogleAuth";
import { useSelector, useDispatch } from "react-redux";
import {
  initialClassesAdd,
  initialClassesRemove,
} from "../features/classes/classesSlice";
import { classSelector } from "../features/classes/classesSlice";
import "../style/header.css";

const Header = () => {
  const { initialClasses } = useSelector(classSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    //initial render styles

    dispatch(initialClassesAdd());

    let id = setTimeout(() => {
      dispatch(initialClassesRemove());
    }, 3000);

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
