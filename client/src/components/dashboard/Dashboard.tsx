import { ReactElement } from "react";
import "../../styles/dashboard.css";
import Header from "../header/Header";

const Dashboard = (): ReactElement => {
  return (
    <main className="dashboard_main">
      <Header />
    </main>
  );
};

export default Dashboard;
