import { ReactElement } from "react";
import "../../styles/header.css";
import HeaderGoogleAuth from "./HeaderGoogleAuth";
import HeaderLightBulb from "./HeaderLightBulb";

type HeaderPropsType = {
  containerClass?: string;
  nav?: React.ReactNode;
};

const Header = ({ containerClass, nav }: HeaderPropsType): ReactElement => {
  containerClass = containerClass ? containerClass : "";

  const renderContent = () => {
    if (nav) {
      return nav;
    }

    return (
      <div className="header_sign_in flex justify-center">
        <HeaderGoogleAuth />
      </div>
    );
  };

  return (
    <header className={`${containerClass} flex justify-center items-center`}>
      <div className="header_logo flex justify-center items-center">
        <HeaderLightBulb />
        <h1 className="header_heading ps-1">Todo World</h1>
      </div>
      {renderContent()}
    </header>
  );
};

export default Header;
