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
  const [headerCycle, cycleHeader] = useCycle(
    "initialAnimation",
    "backAnimation"
  );

  useEffect(() => {}, []);

  const handleClick = (increment: boolean) =>
    setStep((prev) => {
      if (increment) {
        return prev + 1;
      } else {
        cycleHeader(prev === 1 ? 1 : 0);
        return prev - 1;
      }
    });

  return (
    <main className="profile relative isolate flex flex-col px-[50px] sm:px-[100px] h-screen">
      <header className="dashboard_header flex items-center">
        <HeaderLogo link="/" />
      </header>
      <div className="flex-grow-[1] relative justify-evenly items-center flex flex-col gap-14 py-10 px-10">
        <ProfileSetupHeader headerCycle={headerCycle} step={step} />
        <ProfileSetupContent step={step} />
        <ProfileSetupControls step={step} handleStep={handleClick} />
      </div>
    </main>
  );
};

export default ProfileSetup;
