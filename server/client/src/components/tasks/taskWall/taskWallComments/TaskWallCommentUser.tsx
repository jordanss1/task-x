import { ReactElement } from "react";
import { fonts } from "../../../../constants";
import { useMediaQuery } from "../../../../hooks/MediaQueryHooks";
import { UserType } from "../../../../types";
import ProfileIcon from "../../../__reusable/ProfileIcon";

type TaskWallCommentUserPropsType = {
  user: UserType;
};

const TaskWallCommentUser = ({
  user,
}: TaskWallCommentUserPropsType): ReactElement => {
  const mobile = useMediaQuery(640);
  const { profilePicture, userName } = user.userDetails;

  return (
    <div className="flex items-center">
      <ProfileIcon
        className="rounded-full shadow-purple-600 shadow-md bg-slate-400 p-1"
        size={mobile ? 20 : 30}
        img={profilePicture}
      />
      <span
        style={{ fontFamily: fonts.exo }}
        className="text-sm sm:text-[17px] font-light py-1 px-2 select-none"
      >
        {userName}
      </span>
    </div>
  );
};

export default TaskWallCommentUser;
