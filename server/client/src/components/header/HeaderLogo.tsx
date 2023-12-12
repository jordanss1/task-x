import { ReactElement } from "react";
import { Link } from "react-router-dom";
import LightBulb from "../svg/LightBulb";
import HeaderLogoText from "./HeaderLogoText";

type HeaderLogoPropsType = {
  fontSize?: number;
  iconSize?: number;
  link: string;
};

const HeaderLogo = ({
  fontSize = 20,
  iconSize,
  link,
}: HeaderLogoPropsType): ReactElement => {
  return (
    <Link
      to={link}
      className="flex flex-[1] h-full cursor-pointer items-center"
    >
      <LightBulb size={iconSize ?? 45} />
      <HeaderLogoText fontSize={fontSize} />
    </Link>
  );
};

export default HeaderLogo;
