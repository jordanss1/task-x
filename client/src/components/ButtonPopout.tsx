import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, ReactNode, useState } from "react";
import Button from "./Button";
import SmallIcon from "./SmallIcon";

type ButtonPopoutPropsType = {
  children: ReactNode;
  icon?: ReactNode;
  label?: string;
  fontSize?: number;
  iconSize?: number;
  className?: string;
};

const ButtonPopout = ({
  label,
  icon,
  iconSize,
  fontSize,
  className,
  children,
}: ButtonPopoutPropsType): ReactElement => {
  const [expanded, setExpanded] = useState(false);

  className = className ?? "";
  iconSize = iconSize ?? 12;
  fontSize = fontSize ?? 12;
  label = label ?? "";

  icon = icon ? (
    icon
  ) : (
    <SmallIcon size={iconSize} icon={"fa solid fa-angle-down"} />
  );

  return (
    <Button
      label={label}
      fontSize={fontSize}
      onClick={() => setExpanded((prev) => !prev)}
      icon={icon}
      className={`${className} relative p-2 gap-0.5`}
    >
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, transition: { ease: "easeIn" } }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
            className={`absolute w-full top-[40px] origin-top-right h-fit bottom-0 right-0 px-0 border-[1px] rounded-lg overflow-hidden`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default ButtonPopout;
