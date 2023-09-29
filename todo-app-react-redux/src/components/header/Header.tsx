import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../../styles/header.css";
import HeaderGoogleAuth from "./HeaderGoogleAuth";
import HeaderLightBulb from "./HeaderLightBulb";

const Header = () => {
  return (
    <header className="header d-flex justify-content-center align-items-center">
      <div className="header_logo d-flex justify-content-center align-items-center">
        <HeaderLightBulb />
        <h1 className="header_heading ps-1">Todo World</h1>
      </div>
      <div className="header_sign_in d-flex justify-content-center">
        <HeaderGoogleAuth />
      </div>
    </header>
  );
};

export default Header;
