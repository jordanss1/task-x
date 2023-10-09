import { Variants } from "framer-motion";
import { ReactElement } from "react";
import Button from "../Button";
import { SidebarHeadingsType, contentItems } from "./content";

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
      fontSize={18}
      label="Login with Google"
    />
  );

  return (
    <div className="hero_left">
      <h2 className="hero_left_heading text-balance">{heading}</h2>
      <div className="hero_left_body">
        <p>{body}</p>
      </div>
      <div className="pt-5">{button && renderButton}</div>
    </div>
  );
};

export default LandingHeroLeft;
