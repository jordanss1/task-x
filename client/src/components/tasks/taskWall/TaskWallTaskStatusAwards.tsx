import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts, popoutVariants } from "../../../constants";
import { AwardType } from "../../../types";
import ButtonPopout from "../../ButtonPopout";

type TaskWallTaskStatusAwardsPropsType = {
  awards: AwardType[];
};

const TaskWallTaskStatusAwards = ({
  awards,
}: TaskWallTaskStatusAwardsPropsType): ReactElement => {
  // const right = awards.length === 3 ? "-4px" : awards.length ===

  return (
    <div className="flex relative items-start isolate gap-2">
      <div
        style={{ background: colors.hoveredButtonGradient }}
        className="absolute w-[140%] -z-10 top-4 -right-[20%] h-1 rounded-full"
      />
      {awards.map((award) => (
        <Award key={award} award={award} />
      ))}
    </div>
  );
};

const buttonVariants: Variants = {
  hovered: (award: AwardType) => ({
    scale: 1.1,
    y: -5,
    transition: { duration: 0.5, type: "tween" },
  }),
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
    transition: { duration: 1, delay: 0.2, ease: "anticipate", type: "tween" },
  }),
};

const sparkleVariants: Variants = {
  hovered: (opposite) => ({
    opacity: 1,
    scale: 0.7,
    x: opposite ? 14 : -16,
    y: -8,
    rotate: 200,
    width: "200px",
    rotateY: 200,
    transition: { delay: 0.5, duration: 1 },
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
          icon={
            <motion.img
              variants={svgVariants}
              custom={award}
              height={30}
              width={30}
              src={"src/assets/heart-award.svg"}
              style={{
                backdropFilter: "blur(0px)",
                background:
                  "linear-gradient(120deg, rgb(255,215,0,0), rgb(230,0,38,0))",
              }}
              className="rounded-full"
            />
          }
          className="shadow-sm shadow-black rounded-full"
        >
          <motion.div
            variants={popoutVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ fontFamily: fonts.jura }}
            className="absolute z-[5] whitespace-nowrap bottom-[45px] cursor-default origin-top-right -left-[160%] p-1 border-[1px] text-xs rounded-lg overflow-hidden bg-[#f4f0ed] border-slate-400"
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
          icon={
            <motion.img
              variants={svgVariants}
              custom={award}
              height={30}
              width={30}
              src={"src/assets/medal-silver.svg"}
              style={{
                backdropFilter: "blur(0px)",
                background:
                  "linear-gradient(120deg, rgb(255,215,0,0), rgb(230,0,38,0))",
              }}
              className="rounded-full"
            />
          }
          className="shadow-md shadow-cyan-800 rounded-full border-2 border-solid border-slate-400"
        >
          <motion.div
            variants={popoutVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ fontFamily: fonts.jura }}
            className="absolute z-[5] whitespace-nowrap bottom-[45px] cursor-default origin-top-right -left-[250%] p-1 border-[1px] text-xs rounded-lg overflow-hidden bg-[#f4f0ed] border-slate-400"
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
          style={{ y: -3 }}
          icon={
            <>
              <motion.img
                className="absolute mix-blend-multiply z-10"
                custom={false}
                variants={sparkleVariants}
                style={{ opacity: 0, scale: 0.3 }}
                src={"src/assets/sparkles-svgrepo-com.svg"}
              />
              <motion.img
                className="absolute mix-blend-multiply z-10"
                custom={true}
                variants={sparkleVariants}
                style={{ opacity: 0, scale: 0.3 }}
                src={"src/assets/sparkles-svgrepo-com.svg"}
              />
              <motion.img
                variants={svgVariants}
                custom={award}
                height={30}
                width={30}
                src={"src/assets/gold-medal.svg"}
                style={{
                  backdropFilter: "blur(0px)",
                  background:
                    "linear-gradient(120deg, rgb(255,215,0,0), rgb(230,0,38,0))",
                }}
                className="rounded-full"
              />
            </>
          }
          className="relative shadow-lg shadow-[#991ff1] p-[2px] rounded-full border-[3px] border-solid border-[#daa520] isolate"
        >
          <motion.div
            variants={popoutVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ fontFamily: fonts.jura }}
            className="absolute z-[5] whitespace-nowrap bottom-[45px] cursor-default origin-top-right -left-[160%] p-1 border-[1px] text-xs rounded-lg overflow-hidden bg-[#f4f0ed] border-slate-400"
          >
            Legend: 100 likes
          </motion.div>
        </ButtonPopout>
      );
  }
};

export default TaskWallTaskStatusAwards;
