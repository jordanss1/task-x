import { ReactElement, useState } from "react";
import { fonts } from "../../../constants";
import { useMediaQuery } from "../../../hooks/MediaQueryHooks";
import Button from "../../__reusable/Button";
import LikeButton from "../../__reusable/LikeButton";
import SmallIcon from "../../__reusable/SmallIcon";
import TaskWallTaskTimeStamp from "./TaskWallTaskTimeStamp";

type TaskWallTaskInteractionPropsType = {
  likes: number;
  commentAmount: number;
  openComments: boolean;
  created: Date;
  handleComments: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskWallTaskInteraction = ({
  likes,
  commentAmount,
  openComments,
  created,
  handleComments,
}: TaskWallTaskInteractionPropsType): ReactElement => {
  const [liked, setLiked] = useState(false);
  const mobile = useMediaQuery(640);

  const comments = commentAmount > 0 ? commentAmount : "";

  return (
    <div className="w-full min-h-[15px] sm:px-0 px-[1px] flex relative items-baseline justify-between sm:mr-auto sm:ml-auto">
      <div className="sm:hidden">
        <TaskWallTaskTimeStamp time={created} />
      </div>
      <div
        style={{ fontFamily: fonts.jura }}
        className="sm:absolute flex sm:right-[5%] justify-end items-center gap-[6px] sm:gap-4"
      >
        <LikeButton
          likes={likes}
          liked={liked}
          size={mobile ? 13 : 18}
          onClick={() => setLiked((prev) => !prev)}
        />
        <Button
          label={comments}
          onClick={() => handleComments((prev) => !prev)}
          className="gap-1 sm:-mr-3 sm:text-lg text-xs items-baseline font-extralight flex-row-reverse"
          icon={
            <>
              <SmallIcon
                className="text-[#991ff1]"
                size={mobile ? 12 : 18}
                icon="fa-solid fa-comment"
              />
              {commentAmount > 0 && (
                <SmallIcon
                  style={{ order: -1 }}
                  className="text-[#991ff1]"
                  size={mobile ? 12 : 14}
                  icon={
                    openComments
                      ? "fa-solid fa-angle-up"
                      : "fa-solid fa-angle-down"
                  }
                />
              )}
            </>
          }
        />
      </div>
    </div>
  );
};

export default TaskWallTaskInteraction;
