import { motion } from "framer-motion";
import { ReactElement } from "react";
import "../../styles/landing.css";
import LandingHeader from "./LandingHeader";
import LandingHero from "./LandingHero";

//
//

const Landing = (): ReactElement => {
  return (
    <motion.main className="landing">
      <LandingHeader />
      <LandingHero />
    </motion.main>
  );
};

export default Landing;
