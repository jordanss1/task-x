import { AnimatePresence, MotionProps, Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { useScreenSize } from "../../hooks/MediaQueryHooks";
import Clipboard from "../svg/Clipboard";
import Google from "../svg/Google";
import Social from "../svg/Social";
import { SVGPropsType } from "../svg/svgTypes";
import LandingHeroCenterBackdrop from "./LandingHeroCenterBackdrop";

const backDrop1 = (smallScreen: boolean): Variants => {
  return {
    Welcome: (speed) => ({
      x: 0,
      y: 0,
      transition: {
        ease: "backInOut",
        duration: speed === "slow" ? 0.7 : 0.4,
      },
    }),
    Prioritize: (speed) => ({
      x: smallScreen ? 130 : 170,
      transition: {
        ease: "backInOut",
        duration: speed === "slow" ? 0.7 : 0.4,
      },
    }),
    Popular: (speed) => ({
      y: smallScreen ? 120 : 170,
      x: smallScreen ? 160 : 200,
      transition: {
        ease: "backInOut",
        duration: speed === "slow" ? 0.7 : 0.4,
      },
    }),
  };
};

const backDrop2 = (smallScreen: boolean): Variants => {
  return {
    Welcome: (speed) => ({
      x: 0,
      y: 0,
      transition: {
        ease: "backInOut",
        duration: speed === "slow" ? 0.7 : 0.4,
      },
    }),
    Prioritize: (speed) => ({
      x: smallScreen ? -130 : -190,
      transition: {
        ease: "backInOut",
        duration: speed === "slow" ? 0.7 : 0.4,
      },
    }),
    Popular: (speed) => ({
      x: smallScreen ? -120 : -180,
      y: -170,
      transition: {
        ease: "backInOut",
        duration: speed === "slow" ? 0.7 : 0.4,
      },
    }),
  };
};

const SVGVariants: Variants = {
  hidden: {
    x: -50,
    scale: 0.8,
    opacity: 0,
  },
  visible: (speed) => ({
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      ease: "backInOut",
      duration: speed === "slow" ? 0.6 : 0.3,
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
  const screenWidth = useScreenSize();

  const is800 = screenWidth <= 800;

  const backdropProps: MotionProps = {
    animate: hero,
    custom: speed.current,
    style: {
      // boxShadow: "5px 5px 30px 5px black",
      mixBlendMode: "color-burn",
    },
  };

  const props: SVGPropsType = {
    variants: SVGVariants,
    initial: "hidden",
    animate: "visible",
    custom: speed.current,
  };

  const renderImage = () => {
    const iconSize = is800 ? 200 : 300;

    switch (hero) {
      case "Popular":
        return <Social key="1" size={iconSize} {...props} />;
      case "Prioritize":
        return <Clipboard key="2" size={iconSize} {...props} />;
      case "Welcome":
        return <Google key="3" size={iconSize} {...props} />;
    }
  };

  return (
    <div className="hero_center">
      <div className="hero_center_image_div">{renderImage()}</div>
      <div className="hero_center_backdrop_container flex-column">
        <LandingHeroCenterBackdrop
          layoutId="backdrop_1"
          className="hero_center_backdrop_1"
          variants={backDrop1(is800)}
          {...backdropProps}
        />
        <LandingHeroCenterBackdrop
          layoutId="backdrop_2"
          className="hero_center_backdrop_2"
          variants={backDrop2(is800)}
          {...backdropProps}
        />
      </div>
    </div>
  );
};

export default LandingHeroCenter;
