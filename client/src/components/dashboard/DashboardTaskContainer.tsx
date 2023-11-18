import { ReactElement } from "react";
import TaskList from "../tasks/taskList/TaskList";
import TaskWall from "../tasks/taskWall/TaskWall";

interface DashboardTaskContainerPropsType {
  app: "home" | "social";
}

const DashboardTaskContainer = ({
  app,
}: DashboardTaskContainerPropsType): ReactElement => {
  switch (app) {
    case "home":
      return <TaskList />;
    case "social":
      return <TaskWall />;
    default:
      return <TaskList />;
  }
};

export default DashboardTaskContainer;
