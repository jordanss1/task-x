import { useField } from "formik";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { colors, fonts } from "../../../constants";
import Button from "../../Button";
import SmallIcon from "../../SmallIcon";
import { HandleStepType } from "./ProfileSetup";

type ProfileSetupControlsPropTypes = {
  handleStep: HandleStepType;
  step: number;
};

const ProfileSetupControls = ({
  handleStep,
  step,
}: ProfileSetupControlsPropTypes): ReactElement => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 2 } }}
      className="w-full flex flex-col gap-4"
    >
      <div className="max-w-[300px] flex justify-between w-full mr-auto ml-auto">
        <Button
          style={{
            fontFamily: fonts.jura,
          }}
          animate={{
            opacity: step === 0 ? 0.6 : 1,
          }}
          onClick={(e) => handleStep(e, false)}
          disabled={step === 0 || step > 2}
          className="p-[6px] text-slate-900 disabled:text-slate-700 bg-[#e0dcd9] disabled:bg-[#e0dcd970]  flex-row-reverse rounded-xl gap-[1px]"
          icon={
            <SmallIcon
              style={{ color: colors.purple }}
              size={13}
              icon="fa-solid fa-caret-left"
            />
          }
          fontSize={15}
          label="Back"
        />
        <Button
          style={{
            fontFamily: fonts.jura,
          }}
          onClick={(e) => {
            handleStep(e, true);
          }}
          disabled={step > 2}
          className="p-[6px] text-slate-900 disabled:text-slate-700 bg-[#e0dcd9] disabled:bg-[#e0dcd970] gap-[1px] rounded-xl"
          icon={
            <SmallIcon
              style={{ color: colors.purple }}
              size={13}
              icon="fa-solid fa-caret-right"
            />
          }
          fontSize={15}
          label={step < 2 ? "Next" : "Finish"}
        />
      </div>
      <ProgressBar step={step} />
    </motion.div>
  );
};

const ProgressBar = ({ step }: { step: number }): ReactElement => {
  const progressBar =
    step === 0 ? "0%" : step === 1 ? "33%" : step === 2 ? "66%" : "100%";

  return (
    <motion.div className="relative flex max-w-[210px] w-full h-[10px] rounded-full border-1 border-black mr-auto ml-auto">
      <motion.div
        style={{
          background: colors.buttonGradients[1],
        }}
        animate={{
          width: progressBar,
          background:
            step === 3
              ? colors.tappedButtonGradient
              : colors.buttonGradients[1],

          transition: {
            type: "spring",
            delay: 0.1,
            stiffness: 120,
            damping: 30,
          },
        }}
        className="absolute rounded-lg inset-0 w-0"
      />
    </motion.div>
  );
};

export default ProfileSetupControls;
