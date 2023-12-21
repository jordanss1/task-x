import { ReactElement } from "react";
import { fonts } from "../../../../constants";
import { useMediaQuery } from "../../../../hooks/MediaQueryHooks";
import { AwardType, UserType, ValidUserType } from "../../../../types";
import ProfileIcon from "../../../__reusable/ProfileIcon";
import TaskWallTaskTimeStamp from "../TaskWallTaskTimeStamp";
import TaskWallTaskStatusAwards from "./TaskWallTaskStatusAwards";
import TaskWallTaskStatusDue from "./TaskWallTaskStatusDue";

type TaskWallTaskStatusPropsType = {
  user: ValidUserType;
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
  const { profilePicture, userName } = user.profile;

  return (
    <div className="flex justify-between items-center">
      <div className="flex z-10 items-center gap-1 sm:gap-3">
        <ProfileIcon
          className="rounded-full shadow-purple-600 shadow-md bg-slate-400 p-1"
          size={mobile ? 30 : 60}
          img={profilePicture}
        />
        <span
          style={{ fontFamily: fonts.exo }}
          className="text-sm sm:text-xl shadow-sm rounded-xl py-1 px-2 select-none shadow-purple-800"
        >
          {userName}
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
