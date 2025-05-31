import { MotionProps, Variants } from "framer-motion";
import { ReactElement } from "react";
import { useScreenSize } from "../../hooks/MediaQueryHooks";
import Clipboard from "../svg/Clipboard";
import Google from "../svg/Google";
import Social from "../svg/Social";
import { SVGPropsType } from "../svg/svgTypes";
import LandingHeroCenterBackdrop from "./LandingHeroCenterBackdrop";

const backDrop1 = (screenWidth: number): Variants => {
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
      x: screenWidth <= 800 ? 130 : screenWidth <= 576 ? 100 : 170,
      transition: {
        ease: "backInOut",
        duration: speed === "slow" ? 0.7 : 0.4,
      },
    }),
    Popular: (speed) => ({
      y: screenWidth <= 576 ? 100 : screenWidth <= 800 ? 120 : 170,
      x: screenWidth <= 576 ? 130 : screenWidth <= 800 ? 160 : 200,
      transition: {
        ease: "backInOut",
        duration: speed === "slow" ? 0.7 : 0.4,
      },
    }),
  };
};

const backDrop2 = (screenWidth: number): Variants => {
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
      x: screenWidth <= 800 ? -130 : screenWidth <= 576 ? -90 : -190,
      transition: {
        ease: "backInOut",
        duration: speed === "slow" ? 0.7 : 0.4,
      },
    }),
    Popular: (speed) => ({
      x: screenWidth <= 800 ? -120 : -180,
      y: screenWidth <= 576 ? -130 : -170,
      transition: {
        ease: "backInOut",
        duration: speed === "slow" ? 0.7 : 0.4,
      },
    }),
  };
};

const SVGVariants = (is800: boolean): Variants => {
  return {
    hidden: {
      x: -50,
      scale: 0.8,
      opacity: 0,
    },
    visible: (speed) => ({
      y: is800 ? 50 : 0,
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
        ease: "backInOut",
        duration: speed === "slow" ? 0.6 : 0.3,
      },
    }),
  };
};

type LandingHeroCenterPropsType = {
  hero: string;
  speed: React.RefObject<"fast" | "slow">;
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
  };

  const props: SVGPropsType = {
    variants: SVGVariants(is800),
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
      <div className="hero_center_backdrop_container flex-col">
        <LandingHeroCenterBackdrop
          className="hero_center_backdrop_1"
          variants={backDrop1(screenWidth)}
          {...backdropProps}
        />
        <LandingHeroCenterBackdrop
          className="hero_center_backdrop_2"
          variants={backDrop2(screenWidth)}
          {...backdropProps}
        />
      </div>
    </div>
  );
};

export default LandingHeroCenter;
