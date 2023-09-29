import { ReactElement } from "react";
import "../../styles/landing.css";
import LandingHero from "./LandingHero";
import LandingFooter from "./LandingNews";

const Landing = (): ReactElement => {
  return (
    <main className="landing">
      <LandingHero />
      <LandingFooter />
    </main>
  );
};

export default Landing;
