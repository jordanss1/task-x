import { motion } from "framer-motion";
import { ReactElement } from "react";
import Button from "../Button";
import Home from "../svg/Home";
import World from "../svg/World";

type DashboardPanelPropsType = {
  setActive: React.Dispatch<React.SetStateAction<"home" | "social">>;
  active: "home" | "social";
};

const DashboardPanel = ({
  active,
  setActive,
}: DashboardPanelPropsType): ReactElement => {
  const buttonStyle =
    "border-[1px] border-black relative rounded-md p-2 max-w-[205px]";
  const svgStyle = "absolute bottom-10 top-0 right-0 left-0";

  return (
    <section className="pb-2 h-24 px-20 sm:flex justify-center">
      <div className="h-full w-full sm:w-2/4 flex justify-center items-end gap-5 ">
        <Button
          onClick={() => setActive("home")}
          initial={{ flex: 1 }}
          animate={{ flex: active === "home" ? 1 : 0.5 }}
          label="Home"
          className={buttonStyle}
        >
          <motion.div className="relative">
            <Home active={active === "home" ? true : false} />
          </motion.div>
        </Button>
        <Button
          onClick={() => setActive("social")}
          initial={{ flex: 1 }}
          animate={{ flex: active === "social" ? 1 : 0.5 }}
          label="World of Todos"
          className={buttonStyle}
        >
          <motion.div className="relative">
            <World active={active === "social" ? true : false} />
          </motion.div>
        </Button>
      </div>
    </section>
  );
};

export default DashboardPanel;
