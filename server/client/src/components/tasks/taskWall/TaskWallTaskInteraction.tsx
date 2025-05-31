import { ReactElement, useState } from "react";
import { fonts } from "../../../constants";
import { useMediaQuery } from "../../../hooks/MediaQueryHooks";
import { TaskWallTaskType } from "../../../types";
import Button from "../../__reusable/Button";
import LikeButton from "../../__reusable/LikeButton";
import SmallIcon from "../../__reusable/SmallIcon";
import TaskWallTaskTimeStamp from "./TaskWallTaskTimeStamp";

type TaskWallTaskInteractionPropsType = {
  likes: number;
  liked: boolean;
  commentAmount: number;
  openComments: boolean;
  created: string;
  handleLike: () => Promise<void>;
  handleComments: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskWallTaskInteraction = ({
  likes,
  liked,
  commentAmount,
  openComments,
  created,
  handleLike,
  handleComments,
}: TaskWallTaskInteractionPropsType): ReactElement => {
  const [fetching, setFetching] = useState(false);
  const mobile = useMediaQuery(640);

  const comments = commentAmount > 0 ? commentAmount : "";

  return (
    <div className="w-full min-h-[15px] sm:px-0 px-px flex relative items-baseline justify-between sm:mr-auto sm:ml-auto">
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
          style={{
            padding: mobile ? "5px" : "0px",
          }}
          disabled={fetching}
          fetching={fetching}
          size={mobile ? 13 : 18}
          onClick={async () => {
            if (!fetching) {
              setFetching(true);
              await handleLike();
              setFetching(false);
            }
          }}
        />
        <Button
          style={{
            padding: mobile ? "5px" : "0px",
          }}
          label={comments}
          onClick={() => handleComments((prev) => !prev)}
          className="gap-1 sm:-mr-3 sm:text-lg text-xs items-baseline font-extralight flex-row-reverse"
          icon={
            <>
              <SmallIcon
                className="text-[#991ff1]"
                size={mobile ? 14 : 18}
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
