import { ReactElement, useState } from "react";
import "../../styles/dashboard.css";
import Header from "../header/Header";
import DashboardNav from "./DashboardNav";
import DashboardPanel from "./DashboardPanel";

const Dashboard = (): ReactElement => {
  const [active, setActive] = useState<"home" | "social">("home");

  return (
    <div className="dashboard min-h-screen">
      <Header containerClass="dashboard_header" nav={<DashboardNav />} />
      <DashboardPanel setActive={setActive} active={active} />
      <main className="isolate"></main>
    </div>
  );
};

export default Dashboard;
