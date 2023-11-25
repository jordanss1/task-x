import { ReactElement } from "react";
import { fonts } from "../../../constants";
import { useMediaQuery } from "../../../hooks/MediaQueryHooks";
import { AwardType, UserType } from "../../../types";
import ProfileIcon from "../../ProfileIcon";
import TaskWallTaskStatusAwards from "./TaskWallTaskStatusAwards";
import TaskWallTaskStatusDue from "./TaskWallTaskStatusDue";
import TaskWallTaskTimeStamp from "./TaskWallTaskTimeStamp";

type TaskWallTaskStatusPropsType = {
  user: UserType;
  awards: AwardType[];
  created: Date;
  dueDate: Date | undefined;
};

const TaskWallTaskStatus = ({
  user,
  awards,
  created,
  dueDate,
}: TaskWallTaskStatusPropsType): ReactElement => {
  const mobile = useMediaQuery(640);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1 sm:gap-3">
        <ProfileIcon
          className="rounded-full shadow-purple-600 shadow-md bg-slate-400 p-1"
          size={mobile ? 30 : 60}
          img={user.picture}
        />
        <span
          style={{ fontFamily: fonts.exo }}
          className="text-sm sm:text-xl shadow-sm rounded-xl py-1 px-2 select-none shadow-purple-800"
        >
          {user.userName}
        </span>
        {!mobile && <TaskWallTaskTimeStamp time={created} />}
      </div>
      <div className="flex md:flex-row flex-col-reverse relative items-center md:gap-5 gap-2">
        {awards.length > 0 && <TaskWallTaskStatusAwards awards={awards} />}
        <TaskWallTaskStatusDue mobile={mobile} dueDate={dueDate} />
      </div>
    </div>
  );
};

export default TaskWallTaskStatus;
