import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  taskListSelector,
  toggleForm,
} from "../../features/taskList/taskListSlice";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import "../../styles/dashboard.css";
import Header from "../header/Header";
import TaskList from "../tasks/taskList/TaskList";
import DashboardNav from "./DashboardNav";
import DashboardNewTaskButton from "./DashboardNewTaskButton";
import DashboardPanel from "./DashboardPanel";
import DashboardTaskContainer from "./DashboardTaskContainer";

const Dashboard = (): ReactElement => {
  const dispatch = useDispatch();
  const [app, setApp] = useState<"home" | "social">("home");
  const { formActive } = useSelector(taskListSelector);
  const mobile = useMediaQuery(640);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    if (formActive && mobile) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [formActive]);

  const dismissForm = formActive ? () => dispatch(toggleForm()) : () => {};

  return (
    <motion.div
      onClick={() => dismissForm()}
      style={{ paddingLeft: "var(--p-left-from)" }}
      animate={{
        paddingLeft: sidebarExpanded
          ? "var(--p-left-to)"
          : "var(--p-left-from)",
      }}
      className="dashboard isolate min-h-screen sm:[--p-left-from:120px] sm:[--p-left-to:205px] [--p-left-to:50px] [--p-left-from:50px]"
    >
      <Header
        link="/dashboard"
        containerClass="dashboard_header"
        nav={<DashboardNav />}
      />
      <main>
        <DashboardPanel
          expanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
          setApp={setApp}
          app={app}
        />
        <DashboardTaskContainer app={app} />
        <DashboardNewTaskButton formActive={formActive} />
      </main>
    </motion.div>
  );
};

export default Dashboard;
