import { ReactElement } from "react";
import { boolean } from "yup";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import "../../styles/header.css";
import LightBulb from "../svg/LightBulb";
import HeaderGoogleAuth from "./HeaderGoogleAuth";
import HeaderLogo from "./HeaderLogo";

type HeaderPropsType = {
  link: string;
  containerClass?: string;
  nav?: React.ReactNode;
  profile?: boolean;
};

const Header = ({
  link,
  containerClass,
  nav,
  profile,
}: HeaderPropsType): ReactElement => {
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
        {(!nav || mobile || profile) && <HeaderLogo link={link} />}
      </div>
      {renderContent()}
    </header>
  );
};

export default Header;
