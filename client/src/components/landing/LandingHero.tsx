import { ReactElement } from "react";
import background from "../../assets/multicolored-2.jpg";

const LandingHero = (): ReactElement => {
  return (
    <div className="landing_hero">
      <div
        className="landing_hero_BG w-100 h-100"
        style={{
          background: `linear-gradient( to left, rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(${background})`,
        }}
      ></div>
    </div>
  );
};

export default LandingHero;
