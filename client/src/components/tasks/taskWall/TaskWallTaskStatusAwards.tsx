import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import keys from "../../../config/keys";
import { colors, fonts, popoutVariants } from "../../../constants";
import { AwardType } from "../../../types";
import ButtonPopout from "../../ButtonPopout";

type TaskWallTaskStatusAwardsPropsType = {
  awards: AwardType[];
};

const TaskWallTaskStatusAwards = ({
  awards,
}: TaskWallTaskStatusAwardsPropsType): ReactElement => {
  return (
    <div className="flex absolute sm:w-fit w-32 justify-end sm:-right-0 -right-[45%] sm:-top-12 -top-10 md:relative md:top-0 items-center sm:items-start isolate sm:gap-2">
      <div
        style={{ background: colors.hoveredButtonGradient }}
        className="hidden md:block w-[120%] absolute -z-10 top-4 -right-[10%] h-1 rounded-full"
      />
      {awards.map((award) => (
        <Award key={award} award={award} />
      ))}
    </div>
  );
};

const buttonVariants: Variants = {
  hovered: {
    scale: 1.1,
    y: -5,
    backgroundColor: "#e0dcd910",
    transition: {
      duration: 0.5,
      type: "tween",
      backgroundColor: { delay: 0.3 },
    },
  },
};

const svgVariants: Variants = {
  hovered: (award: AwardType) => ({
    scale: award === "communityLegend" ? 1.4 : 1.2,
    y: -7,
    background:
      award === "supported"
        ? "linear-gradient(120deg, rgb(255,215,0), rgb(0,0,255))"
        : award === "superSupported"
        ? "linear-gradient(120deg, rgb(255,215,0), rgb(148 163 184) 50%)"
        : "linear-gradient(120deg, rgb(255,215,0), rgb(230,0,38))",
    padding: "2px",
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 190,
      scale: {
        delay: 0,
        type: "spring",
        stiffness: 190,
      },
    },
  }),
};

const sparkleVariants: Variants = {
  hovered: (opposite) => ({
    opacity: 0.7,
    scale: 0.7,
    x: opposite ? 14 : -16,
    y: -8,
    rotate: 200,
    width: "200px",
    rotateY: 200,
    transition: { duration: 1 },
  }),
};

const Award = ({ award }: { award: AwardType }): ReactElement => {
  switch (award) {
    case "supported":
      return (
        <ButtonPopout
          variants={buttonVariants}
          custom={award}
          whileHover="hovered"
          action="hover"
          style={{
            backgroundColor: "#e0dcd9",
            scale: "var(--scale)",
          }}
          className="shadow-sm sm:[--scale:1.2] [scale:.8] shadow-black relative z-10 rounded-full"
          icon={
            <motion.img
              variants={svgVariants}
              custom={award}
              height={30}
              width={30}
              src={`${keys.server}/api/awards/heart-award.svg`}
              style={{
                background:
                  "linear-gradient(120deg, rgb(255,215,0,0), rgb(230,0,38,0))",
                scale: 1,
              }}
              className="rounded-full"
            />
          }
        >
          <motion.div
            variants={popoutVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ fontFamily: fonts.jura }}
            className="absolute z-[10] whitespace-nowrap bottom-[45px] cursor-default origin-bottom -left-[160%] p-1 border-[1px] text-xs rounded-lg overflow-hidden bg-[#f4f0ed] border-slate-400"
          >
            Supported: 25 likes
          </motion.div>
        </ButtonPopout>
      );
    case "superSupported":
      return (
        <ButtonPopout
          variants={buttonVariants}
          custom={award}
          whileHover="hovered"
          action="hover"
          style={{
            backgroundColor: "#e0dcd9",
            scale: "var(--scale)",
          }}
          className="shadow-md shadow-cyan-800 sm:[--scale:1.2] [scale:.8] rounded-full border-2 border-solid border-slate-400"
          icon={
            <motion.img
              variants={svgVariants}
              custom={award}
              height={30}
              width={30}
              src={`${keys.server}/api/awards/medal-silver.svg`}
              style={{
                background:
                  "linear-gradient(120deg, rgb(255,215,0,0), rgb(230,0,38,0))",
                scale: 1,
              }}
              className="rounded-full"
            />
          }
        >
          <motion.div
            variants={popoutVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ fontFamily: fonts.jura }}
            className="absolute z-[5] whitespace-nowrap bottom-[45px] cursor-default origin-bottom -left-[250%] p-1 border-[1px] text-xs rounded-lg overflow-hidden bg-[#f4f0ed] border-slate-400"
          >
            Super Supported: 50 likes
          </motion.div>
        </ButtonPopout>
      );
    case "communityLegend":
      return (
        <ButtonPopout
          variants={buttonVariants}
          custom={award}
          whileHover="hovered"
          action="hover"
          style={{
            backgroundColor: "#e0dcd9",
            y: -3,
            scale: "var(--scale)",
          }}
          icon={
            <>
              <motion.img
                className="absolute mix-blend-multiply z-10"
                custom={false}
                variants={sparkleVariants}
                style={{ opacity: 0, scale: 0.3 }}
                src={`${keys.server}/api/awards/sparkles.svg`}
              />
              <motion.img
                className="absolute mix-blend-multiply z-10"
                custom={true}
                variants={sparkleVariants}
                style={{ opacity: 0, scale: 0.3 }}
                src={`${keys.server}/api/awards/sparkles.svg`}
              />
              <motion.img
                variants={svgVariants}
                custom={award}
                height={30}
                width={30}
                src={`${keys.server}/api/awards/gold-medal.svg`}
                style={{
                  background:
                    "linear-gradient(120deg, rgb(255,215,0,0), rgb(230,0,38,0))",
                  scale: 1,
                }}
                className="rounded-full"
              />
            </>
          }
          className="relative shadow-lg shadow-[#991ff1] sm:[--scale:1.2] [scale:.8] p-[2px] rounded-full border-[3px] border-solid border-[#daa520] isolate"
        >
          <motion.div
            variants={popoutVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ fontFamily: fonts.jura }}
            className="absolute z-[5] whitespace-nowrap bottom-[47px] cursor-default origin-bottom -left-[110%] p-1 border-[1px] text-xs rounded-lg overflow-hidden bg-[#f4f0ed] border-slate-400"
          >
            Legend: 100 likes
          </motion.div>
        </ButtonPopout>
      );
  }
};

export default TaskWallTaskStatusAwards;
