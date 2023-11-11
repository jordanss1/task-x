import { useCycle } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import "../../../styles/header.css";
import "../../../styles/profile.css";
import HeaderLogo from "../../header/HeaderLogo";
import ProfileSetupBackground from "./ProfileSetupBackground";
import ProfileSetupContent from "./ProfileSetupContent";
import ProfileSetupControls from "./ProfileSetupControls";
import ProfileSetupHeader from "./ProfileSetupHeader";

const ProfileSetup = (): ReactElement => {
  const [step, setStep] = useState(0);
  const [firstCycle, cycleFirst] = useCycle(
    "initialAnimation",
    "backAnimation"
  );

  useEffect(() => {}, []);

  const handleClick = (increment: boolean) =>
    setStep((prev) => {
      if (increment) {
        return prev + 1;
      } else {
        cycleFirst(prev === 1 ? 1 : 0);
        return prev - 1;
      }
    });

  return (
    <main className="profile relative justify-evenly items-center flex flex-col gap-7 sm:gap-14 isolate py-10 px-5  sm:py-20 sm:px-10 h-screen">
      <ProfileSetupHeader firstCycle={firstCycle} step={step} />
      <ProfileSetupContent firstCycle={firstCycle} step={step} />
      <ProfileSetupControls step={step} handleStep={handleClick} />
    </main>
  );
};

export default ProfileSetup;
