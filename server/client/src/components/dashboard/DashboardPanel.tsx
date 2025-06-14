import { motion, Variants } from "framer-motion";
import { capitalize } from "lodash";
import { ReactElement, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppThunkDispatch } from "../../app/store";
import { colors, fonts } from "../../constants";
import { interfaceSelector } from "../../features/interface/interfaceSlice";
import { getUserTasks } from "../../features/taskList/taskListSlice";
import {
  getAllTaskWallTasks,
  getUserWallTasks,
} from "../../features/taskWall/taskWallSlice";
import artificialDelay from "../../functions/artificialDelay";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import useArtificialProgress from "../../hooks/useArtificialProgress";
import Button from "../__reusable/Button";
import ProgressBar from "../__reusable/ProgressBar";
import HeaderLogo from "../header/HeaderLogo";
import MenuButton from "../svg/MenuButton";
import { panelButtons, PanelButtonType } from "./content";

type DashboardPanelPropsType = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const buttonVariants: Variants = {
  animate: (active) => ({
    background: active ? colors.buttonGradients[1] : colors.buttonGradients[0],
    outline: active ? "var(--border-active)" : "var(--border-inactive)",
    padding: active ? "var(--p-from)" : "var(--p-to)",
    transition: { duration: 0.01 },
  }),
  hovered: {
    scale: 1.1,
    background: colors.hoveredButtonGradient,
    boxShadow:
      "1px 1px 5px rgba(0,0,0), -1px -1px 10px rgba(0,0,0,.5), inset .3px .3px 1px rgb(202, 255, 159), inset -.3px -.3px 1px rgb(202, 255, 159)",
  },
};

const DashboardPanel = ({
  expanded,
  setExpanded,
}: DashboardPanelPropsType): ReactElement => {
  const { progress } = useSelector(interfaceSelector);
  const dispatch = useDispatch<AppThunkDispatch>();
  const timer = useRef<NodeJS.Timeout | number>(0);
  const route = useRef<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = useMediaQuery(640);

  const { pathname } = location;

  const { beginProgress, stopProgress, resetProgress } = useArtificialProgress({
    onFullProgress: () =>
      setTimeout(() => {
        navigate(route.current as string);
        resetProgress();

        if (expanded) {
          setExpanded(false);
        }
      }, 300),
  });

  const getAllTasks = async () => {
    if (pathname === "/dashboard/home") {
      await dispatch(getAllTaskWallTasks());
      await dispatch(getUserWallTasks());
    } else {
      await dispatch(getUserTasks());
    }
  };

  const handleClick = async (path: string) => {
    if (path !== pathname) {
      route.current = path;
      await artificialDelay(timer, getAllTasks, beginProgress, stopProgress);
    }
  };

  const renderButtons = panelButtons.map(
    ({ Element, label, path }: PanelButtonType) => {
      const active =
        path === pathname ||
        (pathname.includes("notification") && path.includes("social"));

      return (
        <div
          key={label}
          className="min-w-[50px] items-center sm:min-w-0 sm:w-full flex justify-center"
        >
          <Button
            style={{
              padding: "var(--p-from)",
              outline: "var(--border-active)",
              background: colors.buttonGradients[0],
            }}
            variants={buttonVariants}
            animate="animate"
            whileHover={!active ? "hovered" : ""}
            custom={active}
            onClick={() => handleClick(path)}
            className="group min-h-[50px] sm:min-h-0 sm:[--border-active:1px_solid_#991FFF] sm:[--border-inactive:1px_solid_#991FFF00] [--border-active:3px_solid_rgb(242,238,235)] [--border-inactive:3px_solid_rgb(242,238,235,0)] scale-[1.10] sm:scale-[.9]  transition-all relative rounded-[30%] [--p-from:1rem] [--p-to:.5rem_.8rem] sm:[--p-from:1rem] sm:[--p-to:1rem] p-4 sm:bottom-0 bottom-[32px]"
          >
            <Element
              animate={
                mobile
                  ? {
                      y: active ? 0 : 20,
                      scale: active ? 1.3 : 0.8,
                    }
                  : {}
              }
              active={active}
            />
            {!expanded && (
              <motion.span
                style={{ fontFamily: fonts.jura }}
                className="absolute rounded-full sm:bg-[rgb(54,54,54)]  w-full sm:inline panel_span  sm:text-slate-200 text-slate-800 transition-all duration-300 delay-75 sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:left-[52px] sm:[--opacity-from:1] sm:[--opacity-to:0] [--opacity-from:1] [--opacity-to:0] sm:text-xs text-[10px] font-semibold -bottom-[20px] -left-0 sm:bottom-3 sm:p-1 sm:left-11"
              >
                {capitalize(label)}
              </motion.span>
            )}
          </Button>
          {expanded && (
            <motion.span
              style={{ fontFamily: fonts.jura }}
              className="ps-5 text-slate-800 text-xs font-semibold sm:inline hidden"
            >
              {capitalize(label)}
            </motion.span>
          )}
        </div>
      );
    }
  );

  return (
    <>
      {progress ? <ProgressBar progress={progress} /> : <></>}
      <motion.section
        style={{ width: mobile ? "100%" : "70px" }}
        animate={{ width: expanded ? "var(--w-from)" : "var(--w-to)" }}
        className="dashboard_panel z-5 sm:py-7 flex justify-center sm:justify-start gap-8 sm:gap-6 sm:flex-col items-center fixed left-0 sm:top-0 bottom-0 sm:h-full h-11 sm:w-32 w-full sm:[--w-from:155px] sm:[--w-to:70px] [--w-from:100%] [--w-to:100%]"
      >
        <div className="sm:flex px-3 py-4 gap-1 w-full justify-center items-center hidden min-h-[60px]">
          <motion.div className="flex justify-center flex-2">
            <MenuButton
              animate={{ scale: expanded ? 1.1 : 1 }}
              onClick={() => setExpanded((prev) => !prev)}
              className="cursor-pointer"
            />
          </motion.div>
          {expanded && <HeaderLogo link="/" fontSize={15} />}
        </div>
        {renderButtons}
      </motion.section>
    </>
  );
};

export default DashboardPanel;
