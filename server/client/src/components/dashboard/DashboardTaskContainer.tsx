import { ReactElement } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import TaskList from "../tasks/taskList/TaskList";
import TaskWall from "../tasks/taskWall/TaskWall";

const DashboardTaskContainer = (): ReactElement => {
  const location = useLocation();

  console.log(location.search);

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
