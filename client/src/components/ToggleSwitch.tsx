import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors } from "../constants";

type ToggleSwitchPropsType = {
  label: string;
  disabled: boolean;
  handleToggle: () => void;
  toggled: boolean;
};

const ToggleSwitch = ({
  label,
  disabled,
  handleToggle,
  toggled,
}: ToggleSwitchPropsType): ReactElement => {
  return (
    <div
      onClick={handleToggle}
      className="flex cursor-pointer justify-end items-center gap-2 pr-1"
    >
      <span className="mix-blend-exclusion">{label}</span>
      <motion.div
        style={{
          justifyContent: toggled ? "flex-end" : "flex-start",
        }}
        animate={{
          boxShadow: toggled
            ? `inset 1px 1px 5px ${colors.purple}, inset -1px -1px 5px ${colors.purple}`
            : `inset 1px 1px 5px rgb(153, 31, 255, 0), inset -1px -1px 5px rgb(153, 31, 255, 0)`,
          background: disabled
            ? "linear-gradient(to left, rgb(20,20,20), rgb(40,40,40))"
            : "linear-gradient(to left, rgb(60,60,60), rgb(80,80,80))",
        }}
        className="rounded-3xl flex w-16 h-9 items-center px-1"
      >
        <motion.div
          animate={{
            background: `linear-gradient(120deg, rgb(30,30,30), ${colors.purple})`,
          }}
          transition={{ type: "spring", duration: 0.8 }}
          layout
          className="rounded-full h-7 w-7"
        />
      </motion.div>
    </div>
  );
};

export default ToggleSwitch;
