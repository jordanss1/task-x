import { Variants } from "framer-motion";

export const colors = {
  whiteShades: ["#f4f0ed", "#e0dcd9", "rgb(224, 220, 217)"],
  purple: "rgb(153, 31, 255)",
  green: "rgb(133, 255, 31)",
  yellow: "rgb(202, 255, 159)",
  buttonGradients: [
    "linear-gradient(120deg, rgb(153, 31, 255, 0) 0%, rgb(153, 31, 255, 0) 20% 60%, rgb(202, 255, 159, 0))",
    "linear-gradient(120deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 20% 60%, rgb(202, 255, 159))",
  ],
  hoveredButtonGradient:
    "linear-gradient(120deg, rgb(202, 255, 159) 0%, rgb(153, 31, 255) 30% 70%, rgb(202, 255, 159))",
  tappedButtonGradient:
    "linear-gradient(90deg, rgb(202, 255, 159) 0%, rgb(153, 31, 255) 0% 100%, rgb(202, 255, 159))",

  blackGradient: [
    "linear-gradient(to right, rgb(30, 30, 30,0), rgb(10, 10, 10,0), rgb(30, 30, 30,0))",
    "linear-gradient(to right, rgb(30, 30, 30), rgb(10, 10, 10), rgb(30, 30, 30))",
  ],
};

export const fonts = {
  jura: "'Jura', sans-serif",
  orbitron: "'Orbitron', sans-serif",
  exo: "'Exo 2', sans-serif",
};

export const popoutVariants: Variants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1, transition: { ease: "easeIn" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } },
};
