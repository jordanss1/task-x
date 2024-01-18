import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../../constants";
import { useMediaQuery } from "../../../../hooks/MediaQueryHooks";
import { ValidUserType } from "../../../../types";
import Button from "../../../__reusable/Button";
import ProfileIcon from "../../../__reusable/ProfileIcon";
import SmallIcon from "../../../__reusable/SmallIcon";

type TaskWallCommentUserPropsType = {
  user: ValidUserType["profile"];
  currentUserComment: boolean;
  formActive: boolean;
  handleEdit: (active: boolean) => void;
  handleDelete: () => void;
};

const TaskWallCommentUser = ({
  user,
  currentUserComment,
  formActive,
  handleDelete,
  handleEdit,
}: TaskWallCommentUserPropsType): ReactElement => {
  const mobile = useMediaQuery(640);
  const { profilePicture, userName } = user;

  const buttonStyle = {
    boxShadow:
      "1px 1px 2px rgba(0,0,0), -1px -1px 2px rgba(0,0,0), inset 1px 1px 3px rgba(255,255,255), inset -0px -0px 1px rgba(0,0,0)",
    alignItems: "center",
  };

  const whileTap = {
    boxShadow:
      "1px 1px 2px rgba(0,0,0), -1px -1px 2px rgba(0,0,0,0), inset 1px 1px 3px rgba(255,255,255, 0), inset -1px -1px 3px rgba(0,0,0)",
    scale: 0.9,
  };

  return (
    <div className="flex items-center justify-between">
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
      <AnimatePresence initial={false}>
        {currentUserComment && !formActive && (
          <motion.div
            initial={{ opacity: 0, x: 5 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { type: "tween", ease: "easeInOut", duration: 0.4 },
            }}
            exit={{
              opacity: 0,
              x: 5,
            }}
            className="flex gap-2 pe-4"
          >
            <Button
              onClick={() => handleEdit(true)}
              whileTap={whileTap}
              style={buttonStyle}
              className="flex cursor-pointer justify-center pb-[2px] w-5 h-5 rounded-[.4rem] bg-[rgb(224,220,217)]"
              icon={
                <SmallIcon
                  style={{ color: colors.purple }}
                  size={12}
                  icon="fa-regular fa-pen-to-square"
                />
              }
            />
            <Button
              onClick={() => handleDelete()}
              whileTap={whileTap}
              style={buttonStyle}
              className="flex cursor-pointer justify-center w-5 h-5 rounded-[.4rem] bg-red-500"
              icon={
                <SmallIcon
                  style={{ color: colors.whiteShades[1] }}
                  size={14}
                  icon="fa-solid fa-xmark"
                />
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskWallCommentUser;
