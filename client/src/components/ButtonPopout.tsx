import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import Button from "./Button";
import SmallIcon from "./SmallIcon";

type ButtonPopoutPropsType = {
  children: ReactNode;
  width?: string;
  icon?: ReactNode;
  label?: string;
  fontSize?: number;
  iconSize?: number;
  className?: string;
};

const ButtonPopout = ({
  label = "",
  width = "100%",
  icon,
  iconSize = 12,
  fontSize = 12,
  className = "",
  children,
}: ButtonPopoutPropsType): ReactElement => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  const exitModal = (e: MouseEvent) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
      setExpanded(false);
      document.removeEventListener("click", exitModal);
    }
  };

  useEffect(() => {
    if (expanded) {
      document.addEventListener("click", exitModal);
      return;
    }

    return () => {
      document.removeEventListener("click", exitModal);
    };
  }, [expanded]);

  return (
    <Button
      ref={buttonRef}
      label={label}
      fontSize={fontSize}
      onClick={() => setExpanded((prev) => !prev)}
      icon={
        icon ?? <SmallIcon size={iconSize} icon={"fa solid fa-angle-down"} />
      }
      className={`${className} relative p-2 gap-0.5`}
    >
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, transition: { ease: "easeIn" } }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
            style={{ width }}
            className={`absolute top-[40px] origin-top-right h-fit bottom-0 right-0 px-0 border-[1px] rounded-lg overflow-hidden`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default ButtonPopout;
