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
        className="header_heading w-fit leading-none font-bold  select-none tracking-tighter ps-1"
      >
        Todo World
      </h1>
    </div>
  );
};

export default HeaderLogo;
