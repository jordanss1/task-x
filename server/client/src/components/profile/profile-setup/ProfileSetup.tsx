import { Formik } from "formik";
import { motion, useCycle } from "framer-motion";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppThunkDispatch } from "../../../app/store";
import {
  authSelector,
  setUpdatedProfile,
  updateProfile,
} from "../../../features/auth/authSlice";
import { interfaceSelector } from "../../../features/interface/interfaceSlice";
import { notificationSelector } from "../../../features/notification/notificationSlice";
import artificialDelay from "../../../functions/artificialDelay";
import { useMediaQuery } from "../../../hooks/MediaQueryHooks";
import useArtificialProgress from "../../../hooks/useArtificialProgress";
import { ProfileSchemaType, profileSchema } from "../../../schemas";
import "../../../styles/header.css";
import "../../../styles/profile.css";
import ProgressBar from "../../__reusable/ProgressBar";
import ProfileSetupControls from "./ProfileSetupControls";
import ProfileSetupHeader from "./ProfileSetupHeader";
import ProfileSetupContent from "./profile-setup-content/ProfileSetupContent";

export type HandleStepType = (e: React.MouseEvent, increment: boolean) => void;

const ProfileSetup = (): ReactElement => {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector(notificationSelector);
  const { user } = useSelector(authSelector);
  const { progress } = useSelector(interfaceSelector);
  const { beginProgress, stopProgress } = useArtificialProgress({
    onFullProgress: () => setTimeout(() => navigate("/dashboard/home"), 300),
  });

  const timer = useRef<NodeJS.Timeout | number>(0);

  const mobile = useMediaQuery(640);
  const [firstCycle, cycleFirst] = useCycle(
    "initialAnimation",
    "backAnimation"
  );

  const [contentCycle, cycleContent] = useCycle(
    "intro",
    "userPicture",
    "userName"
  );

  useEffect(() => {
    return () => {
      dispatch(setUpdatedProfile(false));
    };
  }, []);

  useEffect(() => {
    if (step === 0) {
      cycleContent(0);
    } else if (step === 1) {
      cycleContent(1);
    } else if (step === 2) {
      cycleContent(2);
    }
  }, [step]);

  useEffect(() => {
    if (step === 2 && !error) {
      clearTimeout(timer.current);

      const delay = async () => {
        timer.current = await artificialDelay(
          timer,
          undefined,
          beginProgress,
          stopProgress
        );
      };

      setStep(3);
      delay();
    }
  }, [user]);

  return (
    <motion.main
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgb(0,0,0.7) 100%, rgb(0, 0, 0, 1)), url('/multicolored-6.jpg')",
      }}
      animate={{
        backgroundSize: mobile
          ? [
              "100% 80%, 20% 20%",
              "100% 100%, 80% 80%",
              "100% 100%, 110% 95%",
              "100% 100%, 150% 100%",
            ]
          : [
              "100% 80%, 20% 20%",
              "100% 100%, 80% 80%",
              "100% 100%, 95% 95%",
              "100% 100%, 100% 100%",
            ],
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgb(0,0,0,0) 10%,rgb(0, 0, 0, 0.9)), url('/multicolored-6.jpg')",
        transition: {
          duration: 5,
          ease: "circInOut",
          type: "tween",
          backgroundSize: {
            duration: 2,
            easings: [0, 0.4, 0.5, 1],
          },
        },
      }}
      className="profile relative isolate py-20 px-2 sm:px-10 h-screen"
    >
      <ProgressBar progress={progress} />
      <motion.div
        style={{
          opacity: 0,
          background: "linear-gradient(#991ff1, white, black, #991ff1)",
          width: "var(--width)",
        }}
        animate={{
          opacity: 0.4,
          transition: {
            delay: 1,
            duration: 1,
          },
        }}
        className="sm:[--width:90%] [--width:100%] mix-blend-color-burn absolute rounded-[100px] inset-0 m-auto h-[95%] -z-[10]"
      />

      <Formik<ProfileSchemaType>
        initialValues={{
          profilePicture: `/api/profileIcons/default-profile.svg`,
          userName: "",
        }}
        onSubmit={async (values) => await dispatch(updateProfile(values))}
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
            <form className="relative justify-evenly items-center flex flex-col gap-10 h-full">
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
