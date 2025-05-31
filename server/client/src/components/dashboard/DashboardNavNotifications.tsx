import { motion } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { fonts } from "../../constants";
import { notificationSelector } from "../../features/notification/notificationSlice";
import useArtificialProgress from "../../hooks/useArtificialProgress";
import ButtonPopout from "../__reusable/ButtonPopout";
import NotificationBell from "../__reusable/NotificationBell";
import { RouteRefType } from "./DashboardNav";
import DashboardNavNotificationItem from "./DashboardNavNotificationItem";

type DashboardNavNotificationsPropsType = {
  route: React.RefObject<RouteRefType>;
  progress: ReturnType<typeof useArtificialProgress>;
};

const DashboardNavNotifications = ({
  route,
  progress,
}: DashboardNavNotificationsPropsType): ReactElement => {
  const { notifications } = useSelector(notificationSelector);

  useEffect(() => {
    return () => {
      setTimeout(() => progress.resetProgress(), 300);
    };
  }, []);

  const renderNotifications = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, transition: { ease: "easeIn" } }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
        className="absolute z-5 w-56 top-[40px] cursor-default origin-top-right h-fit max-h-96 sm:right-0 -right-14 px-0 border rounded-lg overflow-scroll bg-slate-200 border-slate-400"
      >
        {notifications && notifications?.length ? (
          notifications.map((notification, i) => (
            <DashboardNavNotificationItem
              key={i}
              notification={notification}
              route={route}
              progress={progress}
            />
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
    <li>
      <ButtonPopout icon={<NotificationBell notifications={notifications} />}>
        {renderNotifications()}
      </ButtonPopout>
    </li>
  );
};

export default DashboardNavNotifications;
