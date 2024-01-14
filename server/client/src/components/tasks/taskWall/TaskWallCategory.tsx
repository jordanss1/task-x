import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { taskWallSelector } from "../../../features/taskWall/taskWallSlice";

const TaskWallCategory = (): ReactElement => {
  const { sort } = useSelector(taskWallSelector);
  
  return <div>TaskWallCategory</div>;
};

export default TaskWallCategory;
