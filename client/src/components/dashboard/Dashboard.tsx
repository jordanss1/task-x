import { ReactElement } from "react";
import "../../styles/dashboard.css";
import Header from "../header/Header";
import DashboardNav from "./DashboardNav";

const Dashboard = (): ReactElement => {
  return (
    <div className="dashboard">
      <Header containerClass="dashboard_header" nav={<DashboardNav />} />
    </div>
  );
};

export default Dashboard;
