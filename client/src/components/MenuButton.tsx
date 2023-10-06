import { MotionProps } from "framer-motion";
import { ReactElement } from "react";

const MenuButton = (): ReactElement => {
  return (
    <div className="dashboard_menu_button">
      <div className="menu_circle" />
      <div className="menu_circle" />
      <div className="menu_circle" />
    </div>
  );
};

export default MenuButton;
