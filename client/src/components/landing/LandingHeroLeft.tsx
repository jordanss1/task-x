import { ReactElement } from "react";
import LandingHeroContent from "./LandingHeroLeftContent";
import { contentItems } from "./content";

const LandingHeroLeft = ({ hero }: { hero: string }): ReactElement => {
  const renderContent = () => {
    let index = hero === "Popular" ? 0 : hero === "Prioritize" ? 1 : 2;

    const { heading, body, button } = contentItems[index];

    return <LandingHeroContent heading={heading} body={body} button={button} />;
  };

  return (
    <div className="hero_left w-100 d-flex align-items-center">
      {renderContent()}
    </div>
  );
};

export default LandingHeroLeft;
