import { Formik } from "formik";
import { motion, useCycle } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import keys from "../../../config/keys";
import { ProfileSchemaType, profileSchema } from "../../../schemas";
import "../../../styles/header.css";
import "../../../styles/profile.css";
import ProfileSetupControls from "./ProfileSetupControls";
import ProfileSetupHeader from "./ProfileSetupHeader";
import ProfileSetupContent from "./profile-setup-content/ProfileSetupContent";

export type HandleStepType = (e: React.MouseEvent, increment: boolean) => void;

const ProfileSetup = (): ReactElement => {
  const [step, setStep] = useState(0);
  const [firstCycle, cycleFirst] = useCycle(
    "initialAnimation",
    "backAnimation"
  );

  const [contentCycle, cycleContent] = useCycle(
    "intro",
    "userPicture",
    "userName"
  );

  const userNames = ["love", "five", "test"];

  useEffect(() => {
    if (step === 0) {
      cycleContent(0);
    } else if (step === 1) {
      cycleContent(1);
    } else {
      cycleContent(2);
    }
  }, [step]);

  return (
    <motion.main
      style={{
        backgroundSize: "100% 100%, 1.4rem 2rem, 1rem 1rem, 5rem 5rem",
      }}
      animate={{
        backgroundSize: "100% 100%, 2rem 2rem, 1rem 1rem, 5rem 5rem",
        transition: {
          delay: 1.3,
          duration: 1,
          ease: "easeInOut",
          type: "tween",
        },
      }}
      className="profile relative isolate py-20 px-2 sm:px-10 h-screen"
    >
      <Formik<ProfileSchemaType>
        initialValues={{
          profilePhoto: `/api/profileIcons/default-profile.svg`,
          userName: "",
        }}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
        validationSchema={profileSchema}
      >
        {(props) => {
          const handleStep: HandleStepType = async (e, increment) => {
            e.preventDefault();

            setStep((prev) => {
              if (increment) {
                return prev + 1;
              } else {
                cycleFirst(prev === 1 ? 1 : 0);
                return prev - 1;
              }
            });
          };

          return (
            <form className="justify-evenly items-center flex flex-col gap-10 h-full">
              <ProfileSetupHeader firstCycle={firstCycle} step={step} />
              <ProfileSetupContent
                contentCycle={contentCycle}
                firstCycle={firstCycle}
                step={step}
              />
              <ProfileSetupControls
                step={step}
                handleStep={handleStep}
                {...props}
              />
            </form>
          );
        }}
      </Formik>
    </motion.main>
  );
};

export default ProfileSetup;
