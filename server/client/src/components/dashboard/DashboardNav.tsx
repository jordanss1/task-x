import { Variants, motion } from "framer-motion";
import { ReactElement, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { colors, fonts } from "../../constants";
import { authSelector } from "../../features/auth/authSlice";
import { notificationSelector } from "../../features/notification/notificationSlice";
import artificialDelay from "../../functions/artificialDelay";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import useArtificialProgress from "../../hooks/useArtificialProgress";
import { ValidUserType } from "../../types";
import ButtonPopout from "../__reusable/ButtonPopout";
import MenuPopout from "../__reusable/MenuPopout";
import NotificationBell from "../__reusable/NotificationBell";
import ProfileIcon from "../__reusable/ProfileIcon";
import LightBulb from "../svg/LightBulb";
import DashboardNavNotification from "./DashboardNavNotification";
import { settingsList } from "./content";

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
  const mobile = useMediaQuery(640);
  const timer = useRef<NodeJS.Timeout | number>(0);
  const timer2 = useRef<NodeJS.Timeout | number>(0);
  const route = useRef<string>("");
  const { user } = useSelector(authSelector);
  const { notifications } = useSelector(notificationSelector);
  const navigate = useNavigate();
  const { beginProgress, stopProgress } = useArtificialProgress({
    onFullProgress: () => handleFullProgress(),
  });

  const handleFullProgress = () => {
    clearTimeout(timer2.current);

    timer2.current = setTimeout(() => {
      if (route.current.includes("/api/logout")) {
        window.location.href = route.current;
      } else {
        navigate(route.current);
      }
    }, 300);
  };

  const renderSettings = settingsList.map(({ icon, label, url }) => (
    <motion.div
      key={label}
      transition={{ duration: 0.6 }}
      className="w-full gap-4 sm:min-h-0 min-h-[73px] sm:gap-2 items-center p-2 ps-8 sm:ps-2 hover:bg-slate-500 hover:text-slate-200 sm:hover:bg-slate-200 sm:text-slate-700 sm:hover:text-black sm:rounded-[3px] text-left text-xl sm:text-xs sm:z-auto z-[16] relative flex cursor-pointer"
      onClick={async () => {
        await artificialDelay(timer, undefined, beginProgress, stopProgress);
        route.current = url;
      }}
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
        {notifications && notifications?.length ? (
          notifications.map((notification) => (
            <DashboardNavNotification notification={notification} />
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

  const renderProfile = (profile: ValidUserType["profile"]) => (
    <div
      style={{ background: colors.purpleGradients[1] }}
      className="sm:p-2 sm:px-4 px-8 p-3 items-center flex gap-4 sm:gap-2"
    >
      <div className="min-w-[32px]">
        <ProfileIcon
          className="rounded-full mx-auto w-fit sm:p-[1px] p-[2px] bg-slate-400"
          size={mobile ? 45 : 30}
          img={profile.profilePicture}
        />
      </div>
      <div style={{ flex: 1 }} className="flex flex-col">
        <div
          style={{ color: colors.whiteShades[1] }}
          className="sm:text-xs text-sm text-left sm:text-center"
        >
          Logged in as
        </div>
        <span className="sm:max-w-[115px] sm:text-sm text-xl max-w-[205px] ps-3 sm:ps-0 sm:text-center text-left overflow-hidden text-ellipsis">
          {profile.userName}
        </span>
      </div>
    </div>
  );

  return (
    <nav className="h-10 flex justify-center">
      {user && user.profile && (
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
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { ease: "easeIn" },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.1 },
                }}
                className="absolute w-44 z-[5] top-[40px] cursor-default origin-top-right h-fit right-0 px-0 border-[1px] rounded-lg overflow-hidden bg-[#f4f0ed] border-slate-400"
              >
                {renderProfile(user.profile)}
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
                <div className="absolute p-2 ps-4 bottom-[235px]">
                  <LightBulb size={70} />
                </div>
                {renderProfile(user.profile)}
                {renderSettings}
              </div>
            </motion.div>
          </MenuPopout>
        </motion.ul>
      )}
    </nav>
  );
};

export default DashboardNav;
