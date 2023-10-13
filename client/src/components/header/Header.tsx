import { ReactElement } from "react";
import "../../styles/header.css";
import LightBulb from "../svg/LightBulb";
import HeaderGoogleAuth from "./HeaderGoogleAuth";

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
      <div className="header_logo cursor-pointer mr-auto flex justify-center items-center">
        {!nav && (
          <>
            <LightBulb />
            <h1 className="header_heading text-xl font-bold cursor-pointer select-none tracking-tighter ps-1">
              Todo World
            </h1>
          </>
        )}
      </div>
      {renderContent()}
    </header>
  );
};

export default Header;
