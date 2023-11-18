import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { fonts } from "../../constants";
import ButtonPopout from "../ButtonPopout";
import MenuPopout from "../MenuPopout";
import NotificationBell from "../NotificationBell";
import LightBulb from "../svg/LightBulb";
import { notifications, settingsList } from "./content";

const menuVariants: Variants = {
  initial: {
    scaleX: 0.6,
    filter: "blur(5px)",
  },
  animate: {
    scaleX: 1,
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      filter: { delay: 0.1 },
    },
  },
  exit: {
    scaleX: 0.8,
    opacity: 0,
    filter: "blur(2px)",
    transition: {
      ease: "easeIn",
      filter: { delay: 0.1 },
    },
  },
};

const DashboardNav = ({ profile }: { profile?: boolean }): ReactElement => {
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
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, transition: { ease: "easeIn" } }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
        className="absolute z-[5] w-44 top-[40px] cursor-default origin-top-right h-fit right-0 px-0 border-[1px] rounded-lg overflow-hidden bg-[#f4f0ed] border-slate-400"
      >
        {notifications.length ? (
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
            style={{ fontFamily: fonts.jura }}
            className="w-full p-2 h-full flex items-center justify-center text-slate-800 rounded-[3px] text-sm"
          >
            No notifications
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <nav className="h-10 flex justify-center">
      <motion.ul
        style={{ fontFamily: fonts.jura }}
        className="text-sl items-center list-none flex gap-6 sm:gap-5 z-3"
      >
        {!profile && (
          <li>
            <ButtonPopout
              icon={<NotificationBell notifications={[]} />}
              action="click"
            >
              {renderNotifications()}
            </ButtonPopout>
          </li>
        )}
        <li className="sm:flex hidden items-center">
          <ButtonPopout
            iconSize={10}
            fontSize={15}
            label="Account"
            className="border-0"
            action="click"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, transition: { ease: "easeIn" } }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
              className="absolute w-44 z-[5] top-[40px] cursor-default origin-top-right h-fit right-0 px-0 border-[1px] rounded-lg overflow-hidden bg-[#f4f0ed] border-slate-400"
            >
              {renderSettings}
            </motion.div>
          </ButtonPopout>
        </li>
        <MenuPopout className="sm:hidden min-h-[45px] relative gap-1 flex items-center">
          <motion.div
            key={2}
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
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
