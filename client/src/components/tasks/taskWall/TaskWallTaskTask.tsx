import dayjs from "dayjs";
import { ReactElement } from "react";
import { fonts } from "../../../constants";

type TaskWallTaskTaskPropsType = {
  task: string;
};

const TaskWallTaskTask = ({
  task,
}: TaskWallTaskTaskPropsType): ReactElement => {
  return (
    <div className="px-7 min-h-[56px] flex flex-col items-center gap-3">
      <p
        style={{ fontFamily: fonts.jura }}
        className="text-lg max-w-[580px] w-full font-light"
      >
        {task}
      </p>
    </div>
  );
};

export default TaskWallTaskTask;
