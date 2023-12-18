import { motion } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { interfaceSelector } from "../../features/interface/interfaceSlice";
import "../../styles/landing.css";
import ProgressBar from "../__reusable/ProgressBar";
import Header from "../header/Header";
import LandingHero from "./LandingHero";

const Landing = (): ReactElement => {
  const { progress } = useSelector(interfaceSelector);


  return (
    <motion.main className="landing h-screen">
      <ProgressBar progress={progress} />
      <Header link="/" containerClass="header" />
      <LandingHero />
    </motion.main>
  );
};

export default Landing;
