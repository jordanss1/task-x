import { Variants } from "framer-motion";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { colors } from "../../constants";
import { authSelector } from "../../features/auth/authSlice";
import artificialDelay from "../../functions/artificialDelay";
import { UserStateType, UserType } from "../../types";
import Button from "../Button";

import { SidebarHeadingsType, contentItems } from "./content";

const buttonVariants: Variants = {
  hovered: {
    scale: 1.02,
    background: colors.hoveredButtonGradient,
    boxShadow:
      "1px 1px 15px rgba(0,0,0), -1px -1px 0px rgba(0,0,0), inset .7px .7px 1px rgb(202, 255, 159), inset -.7px -.7px 1px rgb(202, 255, 159)",
  },
  tapped: {
    scale: 0.95,
    background: colors.tappedButtonGradient,
    boxShadow:
      "1px 1px 15px rgba(0,0,0), -1px -1px 0px rgba(0,0,0), inset 1px 1px 5px rgb(202, 255, 159), inset -1px -1px 5px rgb(202, 255, 159)",
    transition: { duration: 0.1, type: "tween" },
  },
};

const LandingHeroLeft = ({
  hero,
}: {
  hero: SidebarHeadingsType;
}): ReactElement => {
  const { user } = useSelector(authSelector);
  const navigate = useNavigate();

  let index = 0;

  if (hero === "Welcome") index = 0;
  if (hero === "Prioritize") index = 1;
  if (hero === "Popular") index = 2;

  const { heading, body, button } = contentItems[index];

  const routeChange = async (
    navigate: NavigateFunction,
    userDetails: UserType["userDetails"]
  ) => {
    //api call will be added to delay later
    await artificialDelay();
    navigate(userDetails ? "/dashboard" : "/setup");
  };

  const buttonProps = {
    style: {
      width: "100%",
      background:
        "linear-gradient(90deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255)20% 80%, rgb(202, 255, 159))",
      boxShadow:
        "1px 3px 10px rgba(0,0,0), -1px -1px 1px rgba(0,0,0), inset 0px 1px 1px rgba(0,0,0,0), inset 0px 1px 1px rgba(0,0,0,0)",
      color: colors.whiteShades[0],
    },
  };

  const renderButton = (
    <a href={user ? undefined : "/api/auth/google"}>
      <Button
        {...buttonProps}
        className="hero_button p-2"
        onClick={() =>
          user ? routeChange(navigate, user.userDetails) : undefined
        }
        variants={buttonVariants}
        whileHover="hovered"
        whileTap="tapped"
        fontSize={18}
        label="Sign in with Google"
      />
    </a>
  );

  return (
    <div className="hero_left">
      <h2 className="hero_left_heading leading-snug">{heading}</h2>
      <div className="hero_left_body">
        <p>{body}</p>
      </div>
      <div className="pt-5">{button && renderButton}</div>
    </div>
  );
};

export default LandingHeroLeft;