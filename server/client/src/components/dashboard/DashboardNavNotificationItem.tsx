import { Variants, motion, progress } from "framer-motion";
import { ReactElement, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { colors, fonts } from "../../constants";
import artificialDelay from "../../functions/artificialDelay";
import useArtificialProgress from "../../hooks/useArtificialProgress";
import { CombinedNotificationType } from "../../types";
import { RouteRefType } from "./DashboardNav";

type DashboardNavNotificationItemPropsType = {
  notification: CombinedNotificationType;
  route: React.MutableRefObject<RouteRefType>;
  progress: ReturnType<typeof useArtificialProgress>;
};

const notificationVariants: Variants = {
  hovered: (unseen) => ({
    background: unseen
      ? "linear-gradient(to right, rgb(239, 68, 68,.5), rgb(239, 68, 68,.4), rgb(239, 68, 68,.5))"
      : "linear-gradient(to right, rgb(206 222 210), rgb(206 222 210), rgb(206 222 210))",
  }),
};

const textVariants: Variants = {
  hovered: (unseen) => ({
    color: unseen ? "white" : "black",
    textShadow: unseen
      ? "1px 1px 7px rgb(0,0,0,.5), -1px -1px 7px rgb(0,0,0,.5)"
      : "1px 1px 7px rgb(0,0,0,.0), -1px -1px 7px rgb(0,0,0,.0)",
  }),
};

const DashboardNavNotificationItem = ({
  notification,
  route,
  progress,
}: DashboardNavNotificationItemPropsType): ReactElement => {
  const { award, task, taskId, total, unseen, type } = notification;
  const timer = useRef<NodeJS.Timeout | number>(0);

  const { beginProgress, stopProgress } = progress;

  if (route.current) {
    route.current.pathname = "/dashboard/social/notification";
    route.current.search = taskId;
  }

  const taskSnippet = (
    <motion.div
      style={{ fontFamily: fonts.jura }}
      className="text-xs px-3  line-clamp-1 text-ellipsis"
    >
      <motion.span variants={textVariants} custom={unseen} className="text-sm">
        "
      </motion.span>
      <motion.span
        style={{ color: unseen ? "rgb(239, 68, 68)" : "black" }}
        variants={textVariants}
        custom={unseen}
        className="italic h-10"
      >
        {task}
      </motion.span>
      <motion.span variants={textVariants} custom={unseen} className="text-sm">
        "
      </motion.span>
    </motion.div>
  );

  const commentOrLikeLabel = () => {
    if (type === "taskLike") {
      return (
        <span>
          You now have {total} {total && total > 1 ? "likes" : "like"} total on
          your task: {taskSnippet}
        </span>
      );
    } else if (type === "commentLike") {
      return (
        <span>
          You now have {total} {total && total > 1 ? "likes" : "like"} on your
          comment on the task: {taskSnippet}
        </span>
      );
    } else {
      return (
        <span>
          You now have {total} {total && total > 1 ? "comments" : "comment"} on
          your task: {taskSnippet}
        </span>
      );
    }
  };

  const awardImage =
    award === "supported"
      ? `/api/awards/heart-award.svg`
      : award === "superSupported"
      ? `/api/awards/medal-silver.svg`
      : `/api/awards/gold-medal.svg`;

  const awardLogo = award ? (
    <img height={40} width={40} src={awardImage} className="" />
  ) : null;

  const commentOrLikeImage =
    type === "commentLike" || type === "taskLike"
      ? "/api/like-shapes.svg"
      : "/api/comment-balloon.svg";

  const commentOrLikeLogo = (
    <img
      style={{
        position: "relative",
        left: type === "newComment" ? "2px" : "0px",
      }}
      height={type === "newComment" ? 30 : 40}
      width={type === "newComment" ? 30 : 40}
      src={commentOrLikeImage}
    />
  );

  const renderNotification = () => {
    if (type === "award" && award) {
      const awardLabel =
        award === "supported"
          ? "Supported"
          : award === "superSupported"
          ? "Super Supported"
          : "Community Legend";

      return (
        <>
          <div className="flex w-full max-w-[53px] my-auto px-2">
            {awardLogo}
          </div>
          <motion.div
            variants={textVariants}
            custom={unseen}
            style={{
              fontFamily: fonts.jura,
              textShadow:
                "0px 0px 7px rgb(0,0,0,.0), -0px -0px 7px rgb(0,0,0,.0)",
              color: unseen ? "rgb(239, 68, 68)" : "black",
            }}
            className="text-xs  w-full p-2 text-left"
          >
            <span style={{ fontWeight: 800 }} className="text-extrabold">
              Congratulations!{" "}
            </span>
            You've earned the{" "}
            <span style={{ fontWeight: 800, color: colors.purple }}>
              {awardLabel}
            </span>{" "}
            award on your task:
            {taskSnippet}
          </motion.div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex w-full max-w-[53px] my-auto px-2">
            {commentOrLikeLogo}
          </div>
          <motion.div
            variants={textVariants}
            custom={unseen}
            style={{
              fontFamily: fonts.jura,
              textShadow:
                "0px 0px 7px rgb(0,0,0,.0), -0px -0px 7px rgb(0,0,0,.0)",
              color: unseen ? "rgb(239, 68, 68)" : "black",
            }}
            className="text-xs w-full p-2 text-left"
          >
            {commentOrLikeLabel()}
          </motion.div>
        </>
      );
    }
  };

  return (
    <motion.div
      onClick={async (e) => {
        e.stopPropagation();
        await artificialDelay(timer, undefined, beginProgress, stopProgress);
      }}
      variants={notificationVariants}
      whileHover="hovered"
      custom={unseen}
      style={{
        background: unseen
          ? "linear-gradient(to right, rgb(239, 68, 68,.0), rgb(239, 68, 68,.1), rgb(239, 68, 68,.0))"
          : "linear-gradient(to right, rgb(226 232 240), rgb(226 232 240), rgb(226 232 240))",
      }}
      className="min-h-[50px] max-h-[105px]  overflow-hidden cursor-pointer flex"
    >
      {renderNotification()}
    </motion.div>
  );
};

export default DashboardNavNotificationItem;
