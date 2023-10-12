import { ReactElement, useState } from "react";
import "../../styles/dashboard.css";
import Button from "../Button";
import Header from "../header/Header";
import DashboardNav from "./DashboardNav";
import DashboardPanel from "./DashboardPanel";

const Dashboard = (): ReactElement => {
  const [active, setActive] = useState<"home" | "social">("home");

  return (
    <div className="dashboard">
      <Header containerClass="dashboard_header" nav={<DashboardNav />} />
      <main className="min-h-screen bg-[#f4f0ed]">
        <DashboardPanel setActive={setActive} active={active} />
      </main>
    </div>
  );
};

export default Dashboard;
