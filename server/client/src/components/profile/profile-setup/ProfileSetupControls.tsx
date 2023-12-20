import { FormikProps } from "formik";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import { ProfileSchemaType } from "../../../schemas";
import Button from "../../__reusable/Button";
import SmallIcon from "../../__reusable/SmallIcon";
import Spinner from "../../__reusable/Spinner";
import { HandleStepType } from "./ProfileSetup";

interface ProfileSetupControlsPropTypes extends FormikProps<ProfileSchemaType> {
  handleStep: HandleStepType;
  step: number;
}

const ProfileSetupControls = ({
  handleStep,
  step,
  ...props
}: ProfileSetupControlsPropTypes): ReactElement => {
  const handleNext = (e: React.MouseEvent) => {
    if (step < 2) {
      return handleStep(e, true);
    }

    props.submitForm();
  };

  const handleBack = (e: React.MouseEvent) => {
    handleStep(e, false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 2 } }}
      className="w-full flex flex-col gap-4"
    >
      <div className="max-w-[300px] flex justify-between w-full mr-auto ml-auto">
        <BackButton step={step} handleClick={handleBack} {...props} />
        <NextButton step={step} handleClick={handleNext} {...props} />
      </div>
      <ProgressBar step={step} />
    </motion.div>
  );
};

interface ProfileSetupButtonPropTypes extends FormikProps<ProfileSchemaType> {
  handleClick: (e: React.MouseEvent) => void;
  step: number;
}

const NextButton = ({
  step,
  handleClick,
  ...props
}: ProfileSetupButtonPropTypes): ReactElement => {
  const { isSubmitting, isValidating } = props;

  const errors =
    step === 2 &&
    (!props.values.userName || props.errors.userName !== undefined);

  const label = isSubmitting ? null : step < 2 ? "Next" : "Finish";

  const disabled = errors || isValidating || isSubmitting;

  return (
    <Button
      style={{
        fontFamily: fonts.jura,
      }}
      onClick={(e) => handleClick(e)}
      type="button"
      disabled={disabled}
      className="p-[6px] text-slate-900 disabled:text-slate-700 bg-[#e0dcd9] disabled:bg-[#e0dcd990] gap-[1px] rounded-xl"
      icon={
        isSubmitting ? (
          <Spinner />
        ) : (
          <SmallIcon
            style={{ color: colors.purple }}
            size={13}
            icon="fa-solid fa-caret-right"
          />
        )
      }
      fontSize={15}
      label={label}
    />
  );
};

const BackButton = ({
  step,
  handleClick,
  ...props
}: ProfileSetupButtonPropTypes): ReactElement => {
  const { isSubmitting, isValidating } = props;

  const disabled = step === 0 || step > 2 || isSubmitting;

  return (
    <Button
      style={{
        fontFamily: fonts.jura,
      }}
      animate={{
        opacity: step === 0 ? 0.6 : 1,
      }}
      type="button"
      onClick={(e) => handleClick(e)}
      disabled={disabled}
      className="p-[6px] text-slate-900 disabled:text-slate-700 bg-[#e0dcd9] disabled:bg-[#e0dcd990]  flex-row-reverse rounded-xl gap-[1px]"
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
