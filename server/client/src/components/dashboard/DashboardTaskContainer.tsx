import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { notificationSelector } from "../../features/notification/notificationSlice";
import { taskWallSelector } from "../../features/taskWall/taskWallSlice";
import TaskList from "../tasks/taskList/TaskList";
import TaskWall from "../tasks/taskWall/TaskWall";
import TaskWallNotification from "../tasks/taskWall/taskWallNotification/TaskWallNotification";

const DashboardTaskContainer = (): ReactElement => {
  const location = useLocation();
  const { allTaskWallTasks } = useSelector(taskWallSelector);

  switch (location.pathname) {
    case "/dashboard/home":
      return <TaskList />;
    case "/dashboard/social":
      return <TaskWall />;
    case "/dashboard/social/notification":
      return <TaskWallNotification key={allTaskWallTasks ? 1 : 2} />;
    default:
      return <TaskList />;
  }
};

export default DashboardTaskContainer;
