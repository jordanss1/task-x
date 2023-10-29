import { Variants } from "framer-motion";
import { ReactElement } from "react";
import { colors } from "../../constants";
import Button from "../Button";
import SmallIcon from "../SmallIcon";

const buttonVariants: Variants = {
  hovered: {
    scale: 1.1,
    background: colors.hoveredButtonGradient,
    boxShadow:
      "1px 1px 5px rgba(0,0,0), -1px -1px 10px rgba(0,0,0,.5), inset .3px .3px 1px rgb(202, 255, 159), inset -.3px -.3px 1px rgb(202, 255, 159)",
  },
  tapped: {
    scale: 0.95,
    background: colors.hoveredButtonGradient,
    boxShadow:
      "1px 1px 10px rgba(0,0,0), -1px -1px 0px rgba(0,0,0), inset 1px 1px 5px rgb(202, 255, 159), inset -1px -1px 5px rgb(202, 255, 159)",
    transition: { duration: 0.1, type: "tween" },
  },
};

const iconVariants: Variants = {
  hovered: { scale: 1.1 },
  tapped: {
    scale: 0.95,
  },
};

const DashboardNewTaskButton = (): ReactElement => {
  const buttonProps = {
    style: {
      background: colors.buttonGradients[1],
      boxShadow:
        "1px 3px 10px rgba(0,0,0,.7), -1px -1px 5px rgba(0,0,0), inset 0px 1px 1px rgba(0,0,0,0), inset 0px 1px 1px rgba(0,0,0,0)",
      scale: 1,
    },
  };

  return (
    <Button
      {...buttonProps}
      variants={buttonVariants}
      whileHover="hovered"
      whileTap="tapped"
      className="fixed flex items-center justify-center rounded-[30%] cursor-pointer sm:bottom-5 bottom-14 right-4 w-16 h-16 bg-black z-[6]"
    >
      <SmallIcon
        variants={iconVariants}
        style={{ color: colors.whiteShades[2], scale: 1 }}
        size={25}
        icon="fa-plus fa-solid"
      />
    </Button>
  );
};

export default DashboardNewTaskButton;
