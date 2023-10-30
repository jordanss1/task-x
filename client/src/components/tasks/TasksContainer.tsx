import { ReactElement } from "react";
import TaskWall from "./taskWall/TaskWall";
import TaskList from "./taskList/TaskList";

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
