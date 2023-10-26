import { AnimatePresence } from "framer-motion";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import Button, { MotionButton } from "./Button";
import SmallIcon from "./SmallIcon";

interface ButtonPopoutPropsType extends MotionButton {
  children: ReactNode;
  action?: "hover" | "click";
  icon?: ReactNode;
  label?: ReactNode;
  fontSize?: number;
  iconSize?: number;
  className?: string;
}

const ButtonPopout = ({
  label = "",
  action = "click",
  icon,
  iconSize = 12,
  fontSize = 12,
  className = "",
  children,
  ...props
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

    return () => document.removeEventListener("click", exitModal);
  }, [expanded]);

  const onClick =
    action === "click" ? () => setExpanded((prev) => !prev) : () => {};

  const onHover = (expanded: boolean) =>
    action === "hover" ? () => setExpanded(expanded) : () => {};

  return (
    <Button
      ref={buttonRef}
      label={label}
      fontSize={fontSize}
      onClick={onClick}
      onMouseEnter={onHover(true)}
      onMouseLeave={onHover(false)}
      icon={
        icon ?? <SmallIcon size={iconSize} icon={"fa solid fa-angle-down"} />
      }
      className={`${className} relative`}
      {...props}
    >
      <AnimatePresence initial={false}>{expanded && children}</AnimatePresence>
    </Button>
  );
};

export default ButtonPopout;
