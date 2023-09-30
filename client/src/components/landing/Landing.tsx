import { ReactElement } from "react";
import "../../styles/landing.css";
import LandingHeader from "./LandingHeader";
import LandingHero from "./LandingHero";

const Landing = (): ReactElement => {
  return (
    <main className="landing">
      <LandingHeader />
      <LandingHero />
    </main>
  );
};

export default Landing;
