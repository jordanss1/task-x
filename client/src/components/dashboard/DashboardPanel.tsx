import { motion } from "framer-motion";
import { ReactElement } from "react";
import Button from "../Button";
import Home from "../svg/Home";
import LightBulb from "../svg/LightBulb";
import World from "../svg/World";

type DashboardPanelPropsType = {
  setActive: React.Dispatch<React.SetStateAction<"home" | "social">>;
  active: "home" | "social";
};

const DashboardPanel = ({
  active,
  setActive,
}: DashboardPanelPropsType): ReactElement => {
  return (
    <section className="dashboard_panel sm:py-7 flex sm:gap-6 sm:flex-col items-center fixed left-0 sm:top-0 bottom-0 sm:h-full h-20 sm:w-32 w-full">
      <div className="sm:block hidden pb-2 border-b-[2px] border-[#991fff30]">
        <LightBulb size={60} />
      </div>
      <Button
        animate={{
          background: active === "home" ? "rgb(6 182 212)" : "rgb(0,0,0,0)",
        }}
        onClick={() => setActive("home")}
        className="group rounded-full p-4"
      >
        <Home active={active === "home" ? true : false} />
      </Button>
      <Button
        animate={{
          background: active === "social" ? "rgb(6 182 212)" : "rgb(0,0,0, 0)",
        }}
        onClick={() => setActive("social")}
        className="group rounded-full p-4"
      >
        <World active={active === "social" ? true : false} />
      </Button>
    </section>
  );
};

export default DashboardPanel;
