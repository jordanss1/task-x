import { ReactElement } from "react";
import HeaderGoogleAuth from "../header/HeaderGoogleAuth";
import HeaderLightBulb from "../header/HeaderLightBulb";

const LandingHeader = (): ReactElement => {
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

export default LandingHeader;
