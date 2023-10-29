import { motion } from "framer-motion";
import { ReactElement, useState } from "react";
import "../../styles/dashboard.css";
import Header from "../header/Header";
import TaskList from "../tasks/task-list/TaskList";
import DashboardNav from "./DashboardNav";
import DashboardNewTaskButton from "./DashboardNewTaskButton";
import DashboardPanel from "./DashboardPanel";

const Dashboard = (): ReactElement => {
  const [app, setApp] = useState<"home" | "social">("home");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <motion.div
      style={{ paddingLeft: "var(--p-left-from)" }}
      animate={{
        paddingLeft: sidebarExpanded
          ? "var(--p-left-to)"
          : "var(--p-left-from)",
      }}
      className="dashboard isolate min-h-screen sm:[--p-left-from:120px] sm:[--p-left-to:205px] [--p-left-to:50px] [--p-left-from:50px]"
    >
      <Header containerClass="dashboard_header" nav={<DashboardNav />} />
      <main>
        <DashboardPanel
          expanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
          setApp={setApp}
          app={app}
        />
        <TaskList />
        <DashboardNewTaskButton />
      </main>
    </motion.div>
  );
};

export default Dashboard;
