import { ReactElement } from "react";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import "../../styles/header.css";
import LightBulb from "../svg/LightBulb";
import HeaderGoogleAuth from "./HeaderGoogleAuth";
import HeaderLogo from "./HeaderLogo";

type HeaderPropsType = {
  containerClass?: string;
  nav?: React.ReactNode;
};

const Header = ({ containerClass, nav }: HeaderPropsType): ReactElement => {
  containerClass = containerClass ? containerClass : "";
  const mobile = useMediaQuery(640);

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
        {(!nav || mobile) && <HeaderLogo />}
      </div>
      {renderContent()}
    </header>
  );
};

export default Header;
