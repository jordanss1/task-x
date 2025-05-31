import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../features/auth/authSlice";
import {
  taskListSelector,
  toggleForm,
} from "../../features/taskList/taskListSlice";
import {
  changeSort,
  taskWallSelector,
} from "../../features/taskWall/taskWallSlice";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import "../../styles/dashboard.css";
import ModalBackground from "../__reusable/ModalBackground";
import Header from "../header/Header";
import DashboardNav from "./DashboardNav";
import DashboardNewTaskButton from "./DashboardNewTaskButton";
import DashboardPanel from "./DashboardPanel";
import DashboardTaskContainer from "./DashboardTaskContainer";

const Dashboard = (): ReactElement => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const { formActive } = useSelector(taskListSelector);

  const mobile = useMediaQuery(640);

  useEffect(() => {
    if (formActive && mobile) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [formActive]);

  useEffect(() => {
    dispatch(changeSort("popular"));
  }, []);

  const dismissForm = formActive ? () => dispatch(toggleForm()) : () => {};

  return (
    <>
      {(user === null || (user && !user.profile)) && (
        <div className="z-100 absolute h-screen w-full bg-white" />
      )}
      <motion.div
        onClick={() => dismissForm()}
        style={{ paddingLeft: "var(--p-left-from)" }}
        animate={{
          paddingLeft: sidebarExpanded
            ? "var(--p-left-to)"
            : "var(--p-left-from)",
        }}
        className="dashboard relative isolate min-h-screen sm:[--p-left-from:120px] sm:[--p-left-to:205px] [--p-left-to:20px] [--p-left-from:20px]"
      >
        {formActive && (
          <ModalBackground mixBlendMode="normal" background="rgba(0,0,0,.2)" />
        )}
        <>
          <Header
            link="/"
            containerClass="dashboard_header"
            nav={<DashboardNav />}
          />
          <main>
            <DashboardPanel
              expanded={sidebarExpanded}
              setExpanded={setSidebarExpanded}
            />
            <DashboardTaskContainer />
            <DashboardNewTaskButton formActive={formActive} />
          </main>
        </>
      </motion.div>
    </>
  );
};

export default Dashboard;
