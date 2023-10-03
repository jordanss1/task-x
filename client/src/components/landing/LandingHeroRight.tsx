import { motion } from "framer-motion";
import { ReactElement } from "react";
import { HandleClickType } from "./LandingHero";
import { sidebarItems } from "./content";

type LandingHeroRightPropsType = {
  hero: string;
  speed: React.MutableRefObject<"fast" | "slow">;
  handleClick: HandleClickType;
};

const LandingHeroRight = ({
  hero,
  speed,
  handleClick,
}: LandingHeroRightPropsType): ReactElement => {
  const renderSidebar = sidebarItems.map(({ heading, body }, i) => (
    <motion.div
      className="hero_right_tab py-3 px-4"
      onClick={() => handleClick(heading, i)}
      key={heading}
    >
      {heading === hero && (
        <motion.div
          layoutId="active_pill"
          className="hero_right_tab_bg"
          style={{
            borderRadius: 20,
            boxShadow: "2px 2px 20px 1px black",
          }}
          transition={{
            type: "spring",
            duration: speed.current === "slow" ? 0.6 : 0.2,
          }}
        />
      )}
      <h3>{heading}</h3>
      <span>{body}</span>
    </motion.div>
  ));

  return (
    <div className="hero_right d-flex justify-content-evenly flex-column">
      {renderSidebar}
    </div>
  );
};

export default LandingHeroRight;
