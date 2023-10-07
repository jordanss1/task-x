import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import Button from "../Button";
import { SidebarHeadingsType, contentItems } from "./content";

type LandingHeroContentType = {
  hero: SidebarHeadingsType;
  body: string;
  heading: string;
  button?: boolean;
};

const buttonVariants: Variants = {
  hovered: {
    scale: 1.03,
  },
  tapped: {
    scale: 1,
  },
};

const LandingHeroLeft = ({
  hero,
}: {
  hero: SidebarHeadingsType;
}): ReactElement => {
  let index = 0;

  if (hero === "Welcome") index = 0;
  if (hero === "Prioritize") index = 1;
  if (hero === "Popular") index = 2;

  const { heading, body, button } = contentItems[index];

  const buttonProps = {
    style: { width: "100%" },
  };

  const renderButton = (
    <Button
      {...buttonProps}
      className="hero_button p-2"
      variants={buttonVariants}
      whileHover="hovered"
      whileTap="tapped"
      layoutId="button"
      children="Login with Google"
    />
  );

  return (
    <div className="hero_left">
      <h2 className="hero_left_heading">{heading}</h2>
      <div className="hero_left_body">
        <p>{body}</p>
      </div>
      <div className="pt-3">{button && renderButton}</div>
    </div>
  );
};

export default LandingHeroLeft;
