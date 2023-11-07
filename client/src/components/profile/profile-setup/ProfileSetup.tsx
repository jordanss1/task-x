import { motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { colors, fonts } from "../../../constants";
import "../../../styles/header.css";
import "../../../styles/profile.css";
import HeaderLogo from "../../header/HeaderLogo";
import ProfileSetupBackground from "./ProfileSetupBackground";
import ProfileSetupContent from "./ProfileSetupContent";
import ProfileSetupControls from "./ProfileSetupControls";
import ProfileSetupHeader from "./ProfileSetupHeader";

const ProfileSetup = (): ReactElement => {
  const [step, setStep] = useState(0);

  const handleClick = (increment: boolean) =>
    setStep((prev) => (increment ? prev + 1 : prev - 1));

  return (
    <main className="profile isolate flex flex-col px-[100px] h-screen">
      <header className="dashboard_header flex items-center">
        <HeaderLogo link="/" />
      </header>
      <div className="flex-grow-[1] relative justify-evenly items-center flex flex-col gap-10 py-20 px-10">
        <ProfileSetupBackground />
        <ProfileSetupHeader step={step} />
        <ProfileSetupContent step={step} />
        <ProfileSetupControls step={step} handleStep={handleClick} />
      </div>
    </main>
  );
};

export default ProfileSetup;
