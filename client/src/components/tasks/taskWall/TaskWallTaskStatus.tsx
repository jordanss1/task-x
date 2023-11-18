import { ReactElement } from "react";
import { fonts } from "../../../constants";
import { UserType } from "../../../types";
import ProfileIcon from "../../ProfileIcon";

type TaskWallTaskStatusPropsType = {
  user: UserType;
};

const TaskWallTaskStatus = ({
  user,
}: TaskWallTaskStatusPropsType): ReactElement => {
  return (
    <div className="flex">
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
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default TaskWallTaskStatus;
