import { Variants } from "framer-motion";
import { ReactElement } from "react";
import Button from "../Button";

type LandingHeroContentType = {
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

const LandingHeroContent = ({
  body,
  heading,
  button,
}: LandingHeroContentType): ReactElement => {
  const buttonProps = {
    style: { width: "100%" },
  };

  const renderButton = (
    <div className="pt-3">
      <Button
        {...buttonProps}
        className="hero_button p-2"
        variants={buttonVariants}
        whileHover="hovered"
        whileTap="tapped"
        layoutId="button"
        children="Login with Google"
      />
    </div>
  );

  return (
    <div className="hero_left_content">
      <h2 className="hero_left_content_heading">{heading}</h2>
      <div className="hero_left_content_body">
        <p>{body}</p>
      </div>
      {button && renderButton}
    </div>
  );
};

export default LandingHeroContent;
