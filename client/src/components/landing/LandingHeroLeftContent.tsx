import { ReactElement } from "react";
import Button from "../Button";

type LandingHeroContentType = {
  body: string;
  heading: string;
  button?: boolean;
};

const LandingHeroContent = ({
  body,
  heading,
  button,
}: LandingHeroContentType): ReactElement => {
  return (
    <div className="hero_left_content">
      <h2 className="hero_left_content_heading">{heading}</h2>
      <div className="hero_left_content_body">
        <p>{body}</p>
        {button && <Button label="Login" />}
      </div>
    </div>
  );
};

export default LandingHeroContent;
