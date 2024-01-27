import { ReactElement } from "react";
import {
  AwardNotificationType,
  CombinedNotificationType,
  CommentAndLikeNotificationType,
} from "../../types";

type DashboardNavNotificationPropsType = {
  notification: CombinedNotificationType;
};

const DashboardNavNotification = ({
  notification,
}: DashboardNavNotificationPropsType): ReactElement => {
  return <div>DashboardNavNotification</div>;
};

export default DashboardNavNotification;
