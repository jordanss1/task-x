import { motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { colors, fonts } from "../../../constants";
import "../../../styles/header.css";
import "../../../styles/profile.css";
import HeaderLogo from "../../header/HeaderLogo";
import ProfileSetupContent from "./ProfileSetupContent";
import ProfileSetupHeader from "./ProfileSetupHeader";

const ProfileSetup = (): ReactElement => {
  const [step, setStep] = useState(0);

  return (
    <main className="profile flex flex-col px-[100px] h-screen">
      <header className="dashboard_header flex items-center">
        <HeaderLogo link="/" />
      </header>
      <div className="flex-grow-[1] flex flex-col gap-10 py-20 px-10">
        <ProfileSetupHeader step={step} />
        <ProfileSetupContent step={step} />
        <div></div>
      </div>
    </main>
  );
};

export default ProfileSetup;
