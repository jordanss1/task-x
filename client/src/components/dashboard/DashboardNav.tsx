import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import Button from "../Button";
import ButtonPopout from "../ButtonPopout";
import MenuButton from "../MenuButton";
import { settingsList } from "./content";

const DashboardNav = (): ReactElement => {
  const renderSettings = () => {
    return (
      <div className="position-absolute top-0 bottom-0 start-0 end-0">
        {settingsList.map((setting) => (
          <Button label={setting} />
        ))}
      </div>
    );
  };

  return (
    <nav>
      <MenuButton>
        <ul className="dashboard_nav p-0 m-0">
          <li className="flex items-center">
            <ButtonPopout label="Settings" className="bg-transparent border-0">
              {renderSettings()}
            </ButtonPopout>
          </li>
        </ul>
      </MenuButton>
    </nav>
  );
};

export default DashboardNav;
