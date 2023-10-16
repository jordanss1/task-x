import { ReactElement } from "react";
import TaskList from "./task-list/TaskList";
import TaskWall from "./task-wall/TaskWall";

interface TasksContainerPropsType {
  app: "home" | "social";
}

const TasksContainer = ({ app }: TasksContainerPropsType): ReactElement => {
  switch (app) {
    case "home":
      return <TaskList />;
    case "social":
      return <TaskWall />;
    default:
      return <TaskList />;
  }
};

export default TasksContainer;
