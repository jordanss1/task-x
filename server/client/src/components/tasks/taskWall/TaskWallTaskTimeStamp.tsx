import dayjs from "dayjs";
import { ReactElement } from "react";
import { fonts } from "../../../constants";

type TaskWallTaskTimeStampPropsType = {
  time: string;
};

const TaskWallTaskTimeStamp = ({
  time,
}: TaskWallTaskTimeStampPropsType): ReactElement => {
  return (
    <span
      style={{ fontFamily: fonts.exo }}
      className="text-[10px] sm:text-xs whitespace-nowrap sm:whitespace-normal text-black bg-slate-300 text-center rounded-2xl p-2 font-light"
    >
      {dayjs(time).format("DD/MM/YYYY  h:mm a")}
    </span>
  );
};

export default TaskWallTaskTimeStamp;
