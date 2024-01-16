import { ReactElement } from "react";
import { fonts } from "../../../constants";

type TaskWallTaskTaskPropsType = {
  task: string;
};

const TaskWallTaskTask = ({
  task,
}: TaskWallTaskTaskPropsType): ReactElement => {
  return (
    <div className="sm:px-10 px-1 min-h-[56px] flex items-center gap-3">
      <p
        style={{ fontFamily: fonts.jura }}
        className="text-sm sm:text-lg max-w-[580px] w-full font-light"
      >
        {task}
      </p>
    </div>
  );
};

export default TaskWallTaskTask;
