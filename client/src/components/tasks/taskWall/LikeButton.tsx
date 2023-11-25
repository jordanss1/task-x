import { ReactElement } from "react";
import { colors } from "../../../constants";
import Button from "../../Button";
import SmallIcon from "../../SmallIcon";

type LikeButtonPropsType = {
  likes: number;
  liked: boolean;
  size?: number;
  onClick: () => void;
};

const LikeButton = ({
  likes,
  liked,
  size,
  onClick,
}: LikeButtonPropsType): ReactElement => {
  const likeAmount = likes > 0 ? likes : "";
  size = size ?? 18;

  return (
    <Button
      label={likeAmount}
      onClick={onClick}
      className="gap-1 items-center font-extralight flex-row-reverse"
      style={{
        fontSize: `${size - 1}px`,
      }}
      icon={
        <SmallIcon
          className="text-[rgb(0,0,0)]"
          animate={{
            y: liked ? [0, -15, 0] : 0,
            color: liked ? colors.purple : "rgb(0,0,0)",
            scale: liked ? [0.5, 1.3, 1] : 1,
            transition: {
              ease: "easeInOut",
              duration: liked ? 0.4 : 0.1,
            },
          }}
          size={size}
          icon="fa-regular fa-thumbs-up"
        />
      }
    />
  );
};

export default LikeButton;
