import { Variants, motion, useSpring } from "framer-motion";
import { ReactElement } from "react";
import colors from "../../assets/colors";
import Button from "../Button";
import ButtonPopout from "../ButtonPopout";
import MenuButton from "../MenuButton";
import Bell from "../svg/Bell";
import { settingsList } from "./content";

const DashboardNav = (): ReactElement => {
  const renderSettings = settingsList.map((setting) => (
    <Button
      transition={{ duration: 0.6 }}
      className="w-full p-2 hover:bg-slate-100 text-slate-800 hover:text-black rounded-[3px] text-left text-xs"
      label={setting}
    />
  ));

  const renderNotification = () => {};

  return (
    <nav>
      <MenuButton className="sm:hidden gap-1 z-[5] flex p-2 rounded-lg">
        <motion.ul className="dashboard_nav align-center sm:h-full list-none flex gap-2 sm:static fixed sm:flex-row flex-col sm:pt-0 pt-[100px] sm:w-fit w-[75%] -right-3/4 z-3 top-0 m-0">
          <li>
            <ButtonPopout icon={<Bell />}>
              <></>
            </ButtonPopout>
          </li>
          <li className="flex items-center">
            <ButtonPopout
              iconSize={10}
              fontSize={15}
              label="Account"
              className="bg-transparent border-0"
            >
              {renderSettings}
            </ButtonPopout>
          </li>
        </motion.ul>
      </MenuButton>
    </nav>
  );
};

export default DashboardNav;
