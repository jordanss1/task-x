import { ReactElement, useRef, useState } from "react";
import { colors, fonts } from "../../../constants";
import Button from "../../Button";
import SmallIcon from "../../SmallIcon";

type TaskWallTaskInteractionPropsType = {
  likes: number;
  commentAmount: number;
  openComments: boolean;
  handleComments: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskWallTaskInteraction = ({
  likes,
  commentAmount,
  openComments,
  handleComments,
}: TaskWallTaskInteractionPropsType): ReactElement => {
  const [liked, setLiked] = useState(false);

  const likeAmount = likes > 0 ? likes : "";
  const comments = commentAmount > 0 ? commentAmount : "";

  return (
    <div className="w-full relative mr-auto ml-auto">
      <div
        style={{ fontFamily: fonts.jura }}
        className="absolute flex right-[5%] justify-end items-center gap-4"
      >
        <Button
          label={likeAmount}
          onClick={() => setLiked((prev) => !prev)}
          className="gap-1 items-center font-extralight flex-row-reverse"
          icon={
            <SmallIcon
              className="text-black"
              animate={{
                y: liked ? [0, -15, 0] : 0,
                color: liked ? colors.purple : "black",
                scale: liked ? [0.5, 1.3, 1] : 1,
                transition: {
                  ease: "easeInOut",
                  duration: liked ? 0.4 : 0.1,
                },
              }}
              size={18}
              icon="fa-regular fa-thumbs-up"
            />
          }
        />
        <Button
          label={comments}
          onClick={() => handleComments((prev) => !prev)}
          className="gap-1 -mr-3 items-baseline font-extralight flex-row-reverse"
          icon={
            <>
              <SmallIcon
                className="text-[#991ff1]"
                size={18}
                icon="fa-solid fa-comment"
              />
              {commentAmount > 0 && (
                <SmallIcon
                  style={{ order: -1 }}
                  className="text-[#991ff1]"
                  size={14}
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
