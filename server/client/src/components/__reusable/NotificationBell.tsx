import { ReactElement } from "react";
import { fonts } from "../../constants";
import {
  AwardNotificationType,
  CommentAndLikeNotificationType,
} from "../../types";

type NotificationBellPropsType = {
  notifications:
    | false
    | (CommentAndLikeNotificationType | AwardNotificationType)[]
    | null;
};

const NotificationBell = ({
  notifications,
}: NotificationBellPropsType): ReactElement => {
  const unseenNotifications =
    notifications && notifications.filter((noti) => noti.unseen === true);

  return (
    <div className="h-full relative flex items-center cursor-pointer">
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        filter={
          unseenNotifications && unseenNotifications.length
            ? "invert(32%) sepia(90%) saturate(6742%) hue-rotate(352deg) brightness(102%) contrast(102%)"
            : ""
        }
      >
        <path d="M18 15v-4.087A5.91 5.91 0 0 0 13.59 5.2a2 2 0 1 0-3.18 0A5.91 5.91 0 0 0 6 10.913V15a3 3 0 0 1-3 3v1h18v-1a3 3 0 0 1-3-3zM12 3a1 1 0 1 1-1 1 1.001 1.001 0 0 1 1-1zM5.643 18A3.992 3.992 0 0 0 7 15v-4.087A4.919 4.919 0 0 1 11.913 6h.174A4.919 4.919 0 0 1 17 10.913V15a3.992 3.992 0 0 0 1.357 3zM13 20h1a2 2 0 0 1-4 0h1a1 1 0 0 0 2 0z" />
        <path fill="none" d="M0 0h24v24H0z" />
      </svg>
      {unseenNotifications && unseenNotifications.length > 0 && (
        <div
          style={{ fontFamily: fonts.exo }}
          className="absolute w-fit h-fit px-1 bottom-3 text-xs left-4 rounded-sm bg-red-500 text-slate-50"
        >
          {unseenNotifications.length}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
