import { Variants } from "framer-motion";
import { ReactElement, useState } from "react";
import Button from "./Button";
import SmallIcon from "./SmallIcon";

type ButtonPopoutPropsType = {
  children: React.ReactNode;
  label: string;
  size?: number;
  className?: string;
};

const buttonVariants: Variants = {
  hover: {
    backgroundColor: "rgba(180,180,180)",
  },
};

const ButtonPopout = ({
  label,
  size,
  className,
  children,
}: ButtonPopoutPropsType): ReactElement => {
  const [expanded, setExpanded] = useState(false);

  className = className ?? "";
  const icon = expanded ? "angle up icon" : "angle down icon";

  size = 5;

  return (
    <Button
      label={label}
      onClick={() => setExpanded((prev) => !prev)}
      icon={<SmallIcon className={`small_icon text-${size}`} icon={icon} />}
      className={`${className} relative p-2 text-${size}`}
      variants={buttonVariants}
      whileHover="hover"
    >
      {expanded && children}
    </Button>
  );
};

export default ButtonPopout;
