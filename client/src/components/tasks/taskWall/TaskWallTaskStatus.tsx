import dayjs from "dayjs";
import { ReactElement } from "react";
import { fonts } from "../../../constants";
import { AwardType, UserType } from "../../../types";
import ProfileIcon from "../../ProfileIcon";
import TaskWallTaskStatusAwards from "./TaskWallTaskStatusAwards";
import TaskWallTaskStatusDue from "./TaskWallTaskStatusDue";

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
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <ProfileIcon
          className="rounded-full shadow-purple-600 shadow-md bg-slate-400 p-1"
          size={60}
          img={user.picture}
        />
        <span
          style={{ fontFamily: fonts.exo }}
          className="text-xl shadow-sm rounded-xl py-1 px-2 select-none shadow-purple-800"
        >
          {user.userName}
        </span>
        <span
          style={{ fontFamily: fonts.exo }}
          className="text-md text-black text-right pl-2 font-light"
        >
          {dayjs(created).format("DD/MM/YYYY")}
        </span>
      </div>
      <div className="flex items-center gap-5">
        {awards.length > 0 && <TaskWallTaskStatusAwards awards={awards} />}
        <TaskWallTaskStatusDue dueDate={dueDate} />
      </div>
    </div>
  );
};

export default TaskWallTaskStatus;
