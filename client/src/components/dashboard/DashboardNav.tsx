import { motion } from "framer-motion";
import { ReactElement } from "react";
import { fonts } from "../../constants";
import ButtonPopout from "../ButtonPopout";
import MenuPopout from "../MenuPopout";
import NotificationBell from "../NotificationBell";
import LightBulb from "../svg/LightBulb";
import { notifications, settingsList } from "./content";

const DashboardNav = (): ReactElement => {
  const renderSettings = settingsList.map(({ icon, label }) => (
    <motion.div
      key={label}
      transition={{ duration: 0.6 }}
      className="w-full gap-4 sm:gap-2 items-center p-2 ps-8 sm:ps-2 hover:bg-slate-500 hover:text-slate-200 sm:hover:bg-slate-200 sm:text-slate-700 sm:hover:text-black sm:rounded-[3px] text-left text-xl sm:text-xs sm:z-auto z-[16] relative flex cursor-pointer"
    >
      <i className={icon} />
      <span>{label}</span>
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
      <div
        style={{ fontFamily: fonts.exo }}
        className="w-full p-2 h-full flex items-center justify-center text-slate-800 rounded-[3px] text-sm"
      >
        No notifications
      </div>
    );
  };

  return (
    <nav>
      <motion.ul className="font-[jura] text-sl items-center list-none flex gap-6 sm:gap-5 z-3">
        <li>
          <ButtonPopout
            width={"250px"}
            height="100px"
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
            className="border-0"
          >
            {renderSettings}
          </ButtonPopout>
        </li>
        <MenuPopout className="sm:hidden relative gap-1 flex items-center">
          <motion.div
            key={2}
            initial={{
              scaleX: 0.6,
              filter: "blur(10px)",
            }}
            animate={{
              scaleX: 1,
              filter: "blur(0px)",
            }}
            exit={{
              scaleX: 0.8,
              opacity: 0,
            }}
            className="dashboard_nav origin-right popout_z_index fixed pt-[min(25vh,120px)] w-8/12 right-0 top-0 bottom-0 left-9/12 cursor-default overflow-hidden"
          >
            <div className="relative">
              <div className="absolute p-2 ps-4 bottom-[100px]">
                <LightBulb size={70} />
              </div>
              {renderSettings}
            </div>
          </motion.div>
        </MenuPopout>
      </motion.ul>
    </nav>
  );
};

export default DashboardNav;
