import { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import TaskList from "../tasks/taskList/TaskList";
import TaskWall from "../tasks/taskWall/TaskWall";

interface DashboardTaskContainerPropsType {
  app: "home" | "social";
}

const DashboardTaskContainer = ({
  app,
}: DashboardTaskContainerPropsType): ReactElement => {
  const location = useLocation();

  switch (location.pathname) {
    case "/dashboard/home":
      return <TaskList />;
    case "/dashboard/social":
      return <TaskWall />;
    default:
      return <TaskList />;
  }
};

export default DashboardTaskContainer;
