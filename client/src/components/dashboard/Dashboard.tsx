import { ReactElement, useState } from "react";
import "../../styles/dashboard.css";
import Header from "../header/Header";
import TodoHeader from "../todos/TodoHeader";
import DashboardNav from "./DashboardNav";
import DashboardPanel from "./DashboardPanel";

const Dashboard = (): ReactElement => {
  const [active, setActive] = useState<"home" | "social">("home");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const header = active === "home" ? "Your todos" : "World of Todos";

  return (
    <div className="dashboard min-h-screen">
      <Header containerClass="dashboard_header" nav={<DashboardNav />} />
      <DashboardPanel
        expanded={sidebarExpanded}
        setExpanded={setSidebarExpanded}
        setActive={setActive}
        active={active}
      />
      <main className="isolate">{/* <TodoHeader header={header} /> */}</main>
    </div>
  );
};

export default Dashboard;
