import { AnimatePresence, MotionProps, Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import Clipboard from "../svg/Clipboard";
import Google from "../svg/Google";
import Social from "../svg/Social";
import { SVGPropsType } from "../svg/svgTypes";
import LandingHeroCenterBackdrop from "./LandingHeroCenterBackdrop";

const backDrop1: Variants = {
  Welcome: (speed) => ({
    x: 0,
    y: 0,
    background: "radial-gradient(circle at 10% 20%, #991fff 30%, black)",
    transition: {
      ease: "backInOut",
      duration: speed === "slow" ? 0.7 : 0.4,
    },
  }),
  Prioritize: (speed) => ({
    x: 170,
    background: "radial-gradient(circle at 110% 20%, #991fff 70%, black)",
    transition: {
      ease: "backInOut",
      duration: speed === "slow" ? 0.7 : 0.4,
    },
  }),
  Popular: (speed) => ({
    y: 170,
    x: 200,
    background: "radial-gradient(circle at 10% 20%, #991fff 30%, black)",
    transition: {
      ease: "backInOut",
      duration: speed === "slow" ? 0.7 : 0.4,
    },
  }),
};

const backDrop2: Variants = {
  Welcome: (speed) => ({
    x: 0,
    y: 0,
    background: "radial-gradient(circle at -10% 90%, #991fff 50%, black)",
    transition: {
      ease: "backInOut",
      duration: speed === "slow" ? 0.7 : 0.4,
    },
  }),
  Prioritize: (speed) => ({
    x: -190,
    background: "radial-gradient(circle at 110% 90%, #991fff 50%, black)",
    transition: {
      ease: "backInOut",
      duration: speed === "slow" ? 0.7 : 0.4,
    },
  }),
  Popular: (speed) => ({
    x: -180,
    y: -170,
    background: "radial-gradient(circle at -10% 90%, #991fff 50%, black)",
    transition: {
      ease: "backInOut",
      duration: speed === "slow" ? 0.7 : 0.4,
    },
  }),
};

const SVGVariants: Variants = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: (speed) => ({
    x: 0,
    opacity: 1,
    transition: {
      ease: "backInOut",
      duration: speed === "slow" ? 0.3 : 0.15,
    },
  }),
  exit: (speed) => ({
    x: 50,
    opacity: 0,
    transition: {
      ease: "backInOut",
      duration: speed === "slow" ? 0.3 : 0.15,
    },
  }),
};

type LandingHeroCenterPropsType = {
  hero: string;
  speed: React.MutableRefObject<"fast" | "slow">;
};

const LandingHeroCenter = ({
  hero,
  speed,
}: LandingHeroCenterPropsType): ReactElement => {
  const backdropProps: MotionProps = {
    animate: hero,
    custom: speed.current,
    style: {
      boxShadow: "5px 5px 30px 5px black",
    },
  };

  const renderImage = () => {
    const props: SVGPropsType = {
      variants: SVGVariants,
      initial: "hidden",
      animate: "visible",
      exit: "exit",
      custom: speed.current,
    };

    switch (hero) {
      case "Popular":
        return <Social key="1" size={300} {...props} />;
      case "Prioritize":
        return <Clipboard key="2" size={300} {...props} />;
      case "Welcome":
        return <Google key="3" size={300} {...props} />;
    }
  };

  return (
    <div className="hero_center">
      <div className="hero_center_image_div">
        <AnimatePresence mode="wait" initial={false}>
          {renderImage()}
        </AnimatePresence>
      </div>
      <div className="hero_center_backdrop_container flex-column">
        <LandingHeroCenterBackdrop
          layoutId="backdrop_1"
          className="hero_center_backdrop_1"
          variants={backDrop1}
          {...backdropProps}
        />
        <LandingHeroCenterBackdrop
          layoutId="backdrop_2"
          className="hero_center_backdrop_2"
          variants={backDrop2}
          {...backdropProps}
        />
      </div>
    </div>
  );
};

export default LandingHeroCenter;
