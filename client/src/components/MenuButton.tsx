import { ReactElement, ReactNode } from "react";

const MenuButton = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <>
      <div className="dashboard_menu_button">
        <div className="menu_circle" />
        <div className="menu_circle" />
        <div className="menu_circle" />
      </div>
      {children}
    </>
  );
};

export default MenuButton;
