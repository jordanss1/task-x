import { ReactElement } from "react";

const HeaderLogoText = ({
  fontSize = 20,
}: {
  fontSize?: number;
}): ReactElement => {
  return (
    <div
      style={{ fontSize: `${fontSize}px` }}
      className="header_heading w-fit leading-none font-bold select-none tracking-tighter px-1 whitespace-nowrap"
    >
      <span className="text-md">Task</span>
      <span className="logo_X ps-1 text-md">X</span>
    </div>
  );
};

export default HeaderLogoText;
