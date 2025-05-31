import { Variants, motion } from 'framer-motion';
import { ReactElement } from 'react';
import { colors } from '../../constants';
import { HandleClickType } from './LandingHero';
import { sidebarItems } from './content';

type LandingHeroRightPropsType = {
  hero: string;
  speed: React.RefObject<'fast' | 'slow'>;
  handleClick: HandleClickType;
};

const tabVariants: Variants = {
  hovered: (active) =>
    active
      ? {}
      : {
          backdropFilter: 'blur(10px) drop-shadow(1px 1px white)',
          background:
            'linear-gradient(135deg, rgba(0, 0, 0, .5), rgba(0, 0, 0,.2)',
          outline: '2px solid white',
          scale: 1.05,
        },
};

const textVariants: Variants = {
  hovered: {
    transition: {
      filter: { duration: 0.2 },
    },
  },
};

const LandingHeroRight = ({
  hero,
  speed,
  handleClick,
}: LandingHeroRightPropsType): ReactElement => {
  const renderSidebar = sidebarItems.map(({ heading, body }, i) => (
    <motion.div
      className="hero_right_tab max-[800px]:max-w-[200px] px-4 py-5 sm:px-5"
      style={{
        borderRadius: 20,
        background:
          'linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, .1)',
      }}
      variants={tabVariants}
      onClick={() => handleClick(heading, i)}
      key={heading}
      custom={heading === hero}
      whileHover="hovered"
    >
      {heading === hero && (
        <motion.div
          layoutId="active_pill"
          className="hero_right_tab_bg"
          style={{
            borderRadius: 20,
            boxShadow: '2px 2px 10px black',
          }}
          transition={{
            type: 'spring',
            duration: speed.current === 'slow' ? 1 : 0.4,
          }}
        />
      )}
      <motion.h3
        className="text-[15px] md:text-[18px] font-extrabold select-none"
        variants={textVariants}
      >
        {heading}
      </motion.h3>
      <motion.span
        className="text-xs text-balance sm:text-sm md:text-sm select-none"
        variants={textVariants}
      >
        {body}
      </motion.span>
    </motion.div>
  ));

  return (
    <div className="hero_right flex justify-evenly flex-col gap-0.5">
      {renderSidebar}
    </div>
  );
};

export default LandingHeroRight;
