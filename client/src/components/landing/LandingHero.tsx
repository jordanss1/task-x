import { ReactElement, useEffect, useRef, useState } from "react";
import setHeroInterval from "../../functions/setHeroInterval";
import LandingHeroCenter from "./LandingHeroCenter";
import LandingHeroLeft from "./LandingHeroLeft";
import LandingHeroRight from "./LandingHeroRight";
import { SidebarHeadingsType } from "./content";

export type HandleClickType = (
  heading: "Welcome" | "Prioritize" | "Popular",
  currentIndex: number
) => void;

const LandingHero = (): ReactElement => {
  const [hero, setHero] = useState<SidebarHeadingsType>("Welcome");

  const timer = useRef<NodeJS.Timer | number>(0);

  const speed = useRef<"slow" | "fast">("slow");

  useEffect(() => {
    timer.current = setHeroInterval(setHero);

    return () => clearInterval(timer.current as number);
  }, []);

  const handleClick = (heading: typeof hero, currentIndex: number) => {
    speed.current = "fast";

    clearInterval(timer.current as number);

    setHero(heading);

    timer.current = setHeroInterval(setHero, currentIndex, speed);
  };

  return (
    <section className="hero">
      <LandingHeroLeft hero={hero} />
      <LandingHeroCenter hero={hero} speed={speed} />
      <LandingHeroRight hero={hero} speed={speed} handleClick={handleClick} />
    </section>
  );
};

export default LandingHero;
