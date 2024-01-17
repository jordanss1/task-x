import { AnimatePresence, MotionProps } from "framer-motion";
import { ReactElement } from "react";
import { colors } from "../../constants";
import Button from "./Button";
import SmallIcon from "./SmallIcon";
import Spinner from "./Spinner";

export type MotionButton = MotionProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

type LikeButtonPropsType = MotionButton & {
  likes: number;
  liked: boolean;
  fetching: boolean;
  size?: number;
  onClick: () => void;
};

const LikeButton = ({
  likes,
  fetching,
  liked,
  size,
  onClick,
  ...props
}: LikeButtonPropsType): ReactElement => {
  const likeAmount = fetching ? (
    <div className="flex relative top-0">
      <Spinner position="initial" size="small" />
    </div>
  ) : likes > 0 ? (
    likes
  ) : (
    ""
  );

  size = size ?? 18;

  const renderLabel = (
    <AnimatePresence initial={false}>
      <SmallIcon
        className="text-[rgb(0,0,0)]"
        style={{
          y: 0,
          color: liked ? colors.purple : "rgb(0,0,0)",
          scale: 1,
        }}
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
    </AnimatePresence>
  );

  return (
    <Button
      {...props}
      label={likeAmount}
      onClick={onClick}
      className="items-center justify-center font-extralight flex-row-reverse"
      style={{
        gap: fetching ? "6px" : "4px",
        alignItems: fetching ? "center" : "baseline",
        fontSize: `${size - 1}px`,
      }}
      icon={renderLabel}
    />
  );
};

export default LikeButton;
