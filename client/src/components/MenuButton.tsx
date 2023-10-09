import { ReactElement, ReactNode } from "react";

type MenuButtonPropsType = { children: ReactNode; className: string };

const MenuButton = ({
  children,
  className,
}: MenuButtonPropsType): ReactElement => {
  return (
    <>
      <div className={className}>
        <div className="menu_circle" />
        <div className="menu_circle" />
        <div className="menu_circle" />
      </div>
      {children}
    </>
  );
};

export default MenuButton;
