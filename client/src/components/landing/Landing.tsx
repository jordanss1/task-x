import { motion } from "framer-motion";
import { ReactElement } from "react";
import "../../styles/landing.css";
import Header from "../header/Header";
import LandingHero from "./LandingHero";

//
//

const Landing = (): ReactElement => {
  return (
    <motion.main className="landing h-screen">
      <Header containerClass="header" />
      <LandingHero />
    </motion.main>
  );
};

export default Landing;
