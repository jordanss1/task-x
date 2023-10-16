import { ReactElement } from "react";
import LightBulb from "../svg/LightBulb";

type HeaderLogoPropsType = {
  fontSize?: number;
  iconSize?: number;
};

const HeaderLogo = ({
  fontSize = 20,
  iconSize,
}: HeaderLogoPropsType): ReactElement => {
  return (
    <div className="flex flex-[1] cursor-pointer items-center">
      <LightBulb size={iconSize ?? 45} />
      <h1
        style={{ fontSize: `${fontSize}px` }}
        className="header_heading w-fit leading-none font-bold select-none tracking-tighter px-1 whitespace-nowrap"
      >
        <span className="text-md">Task</span>
        <span className="logo_X ps-1 text-md">X</span>
      </h1>
    </div>
  );
};

export default HeaderLogo;
