import { useField } from "formik";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../constants";

type ToggleSwitchPropsType = {
  label: string;
  disabled?: boolean;
  handleToggle: () => void;
  name: string;
};

const ToggleSwitch = ({
  label,
  disabled = false,
  handleToggle,
  ...props
}: ToggleSwitchPropsType): ReactElement => {
  const [field, meta] = useField(props);

  return (
    <div
      style={{ cursor: disabled ? "default" : "pointer" }}
      onClick={handleToggle}
      className="flex justify-between justify-end items-center py-[2px] gap-2 pr-1"
    >
      <span
        style={{
          fontFamily: fonts.orbitron,
          color: disabled ? "rgb(120,120,120)" : colors.whiteShades[1],
        }}
        className="ps-2 text-xs"
      >
        {label}
      </span>
      <motion.div
        layout
        style={{
          justifyContent: field.value ? "flex-end" : "flex-start",
        }}
        animate={{
          boxShadow: disabled
            ? `inset 1px 1px 2px rgb(60, 60, 60, 0), inset -1px -1px 2px rgb(60, 60, 60, 0)`
            : field.value
            ? `inset 1px 1px 2px rgb(153, 31, 255,1), inset -1px -1px 0px rgb(153, 31, 255,1)`
            : `inset 1px 1px 2px rgb(60, 60, 60, .5), inset -1px -1px 2px rgb(60, 60, 60, .5)`,
          background: disabled ? "rgb(30,30,30)" : "rgb(35,35,35)",
          transition: { type: "spring" },
        }}
        className="rounded-3xl flex w-16 h-8 items-center px-1"
      >
        <motion.div
          layout
          style={{
            background: `linear-gradient(120deg, rgb(30,30,30), rgb(153, 31, 255,.5) 60%, rgb(30,30,30))`,
            outline: "1px solid rgb(55,55,55)",
          }}
          animate={{
            background: disabled
              ? `linear-gradient(120deg, rgb(30,30,30), rgb(153, 31, 255,.5) 60%, rgb(30,30,30))`
              : `linear-gradient(120deg, rgb(30,30,30), ${colors.purple}, rgb(30,30,30))`,
            outline: disabled ? "1px solid rgb(55,55,55)" : "0px solid white",
          }}
          transition={{ layout: { stiffness: 150, type: "spring" } }}
          className="rounded-full h-7 w-7"
        />
      </motion.div>
    </div>
  );
};

export default ToggleSwitch;
