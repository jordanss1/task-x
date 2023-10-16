import { motion } from "framer-motion";
import { ReactElement, useState } from "react";
import "../../styles/dashboard.css";
import Header from "../header/Header";
import TasksContainer from "../tasks/TasksContainer";
import DashboardNav from "./DashboardNav";
import DashboardPanel from "./DashboardPanel";

const Dashboard = (): ReactElement => {
  const [app, setApp] = useState<"home" | "social">("home");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <motion.div
      animate={{
        paddingLeft: sidebarExpanded
          ? "var(--p-left-to)"
          : "var(--p-left-from)",
      }}
      className="dashboard min-h-screen sm:[--p-left-from:70px] sm:[--p-left-to:155px] [--p-left-to:50px] [--p-left-from:50px]"
    >
      <Header containerClass="dashboard_header" nav={<DashboardNav />} />
      <main className="isolate">
        <DashboardPanel
          expanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
          setApp={setApp}
          app={app}
        />
        <TasksContainer app={app} />
      </main>
    </motion.div>
  );
};

export default Dashboard;
