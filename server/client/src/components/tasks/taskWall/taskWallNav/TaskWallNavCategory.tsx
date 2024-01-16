import { Variants } from "framer-motion";
import { ReactElement, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../../../../app/store";
import { colors } from "../../../../constants";
import {
  changeCategory,
  getAllTaskWallTasks,
  getUserWallTasks,
  setTaskWallFetching,
} from "../../../../features/taskWall/taskWallSlice";
import artificialDelay from "../../../../functions/artificialDelay";
import Button from "../../../__reusable/Button";
import SmallIcon from "../../../__reusable/SmallIcon";
import Social from "../../../svg/Social";

const TaskWallNavCategory = ({
  category,
}: {
  category: "all" | "user";
}): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const timer = useRef<NodeJS.Timeout | number>(0);

  const handleClick = async (category: "all" | "user") => {
    dispatch(setTaskWallFetching(true));

    const action =
      category === "all"
        ? () => setTimeout(() => dispatch(getAllTaskWallTasks()), 1000)
        : () => setTimeout(() => dispatch(getUserWallTasks()), 1000);

    await artificialDelay(timer, action);

    dispatch(changeCategory(category));
  };

  const rightButtonVariants: Variants = {
    animate: {
      background:
        category === "all"
          ? colors.buttonGradients[0]
          : colors.hoveredButtonGradient,
      boxShadow:
        category === "all"
          ? "1px 1px 3px rgb(50,50,50), -0px -0px 3px rgb(50,50,50)"
          : "inset 2px 2px 5px rgb(30,30,30), inset -0px -1px 1px rgb(30,30,30)",
      minHeight: category === "all" ? "36px" : "39px",
    },
  };

  const leftButtonVariants: Variants = {
    animate: {
      background:
        category === "all"
          ? colors.hoveredButtonGradientInverted
          : colors.buttonGradients[0],
      boxShadow:
        category === "all"
          ? "inset 2px 2px 5px rgb(30,30,30), inset -1px -0px 3px rgb(30,30,30)"
          : "0px 1px 1px rgb(50,50,50), -1px -1px 3px rgb(50,50,50)",
      minHeight: category === "all" ? "39px" : "36px",
    },
  };

  return (
    <div style={{}} className="flex gap-[0px] items-center max-h-[28px]">
      <Button
        variants={leftButtonVariants}
        onClick={async () => {
          if (category === "user") {
            await handleClick("all");
          }
        }}
        animate="animate"
        className="min-w-[43px] min-h-[39px] px-2 justify-center"
        style={{
          boxShadow:
            " inset 2px 2px 5px rgb(30,30,30), inset -0px -1px 1px rgb(30,30,30)",
          alignItems: "center",
          borderRadius: "200px 0px 0px 200px",
        }}
        icon={
          <Social
            active={category === "all" ? true : false}
            size={category === "all" ? 26 : 28}
          />
        }
      />
      <Button
        onClick={async () => {
          if (category === "all") {
            await handleClick("user");
          }
        }}
        className="min-w-[45px] min-h-[36px]  px-2 border-l-0 justify-center"
        variants={rightButtonVariants}
        animate="animate"
        style={{
          boxShadow: "1px 1px 3px rgb(50,50,50), -0px -0px 3px rgb(50,50,50)",
          alignItems: "center",
          borderRadius: "0px 200px 200px 0px",
        }}
        icon={
          <SmallIcon
            style={{
              color: category === "user" ? "rgb(230,230,230)" : "rgb(50,50,50)",
            }}
            className="relative right-[2px]"
            size={category === "user" ? 16 : 18}
            icon="fa-regular fa-user"
          />
        }
      />
    </div>
  );
};

export default TaskWallNavCategory;
