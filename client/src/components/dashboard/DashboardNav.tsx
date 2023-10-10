import { motion } from "framer-motion";
import { ReactElement, useRef } from "react";
import ButtonPopout from "../ButtonPopout";
import MenuPopout from "../MenuPopout";
import NotificationBell from "../NotificationBell";
import { notifications, settingsList } from "./content";

const DashboardNav = (): ReactElement => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const renderSettings = settingsList.map((setting) => (
    <motion.div
      key={setting}
      transition={{ duration: 0.6 }}
      className="w-full p-2 ps-4 sm:ps-0 hover:bg-slate-600 hover:text-slate-300 sm:hover:bg-slate-100 text-slate-800 sm:hover:text-black sm:rounded-[3px] text-left text-xl sm:text-xs"
    >
      {setting}
    </motion.div>
  ));

  const renderNotifications = () => {
    return notifications.length ? (
      notifications.map((notification) => (
        <div
          key={notification}
          className="w-full p-2 hover:bg-slate-100 text-slate-800 hover:text-black rounded-[3px] text-left text-xs"
        >
          {notification}
        </div>
      ))
    ) : (
      <div className="w-full p-2 hover:bg-slate-100 text-slate-800 hover:text-black rounded-[3px] text-left text-xs">
        No notifications
      </div>
    );
  };

  return (
    <nav>
      <motion.ul className="font-[jura] text-sl items-center list-none flex gap-6 sm:gap-2 z-3">
        <li>
          <ButtonPopout
            width={"250px"}
            icon={<NotificationBell notifications={[]} />}
          >
            {renderNotifications()}
          </ButtonPopout>
        </li>
        <li className="sm:flex hidden items-center">
          <ButtonPopout
            width="175px"
            iconSize={10}
            fontSize={15}
            label="Account"
            className="bg-transparent border-0"
          >
            {renderSettings}
          </ButtonPopout>
        </li>
        <MenuPopout className="sm:hidden relative z-[5] gap-1 flex items-center">
          <motion.div className="dashboard_nav fixed pt-[min(25vh,100px)] w-8/12 right-0 top-0 bottom-0 left-9/12 cursor-default">
            {renderSettings}
          </motion.div>
        </MenuPopout>
      </motion.ul>
    </nav>
  );
};

export default DashboardNav;
