import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import Button from "./Button";
import MenuButton from "./svg/MenuButton";

type MenuPopoutPropsType = {
  children: ReactNode;
  className: string;
};

const MenuPopout = ({
  children,
  className,
}: MenuPopoutPropsType): ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = (e: MouseEvent) => {
    if (
      e.currentTarget?.activeElement !== buttonRef.current &&
      !menuRef.current?.contains(e.target as Node)
    ) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    if (expanded) {
      document.addEventListener("click", closeMenu);
    }
  }, [expanded]);

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setExpanded((prev) => !prev)}
        className={className}
      >
        <AnimatePresence>
          {expanded ? (
            <i className="fa-solid fa-xmark relative bottom-3 left-12 text-3xl p-1 rounded-md text-slate-800 hover:bg-slate-900 hover:text-slate-400" />
          ) : (
            <MenuButton />
          )}
        </AnimatePresence>
      </Button>
      <div ref={menuRef}>{expanded && children}</div>
    </>
  );
};

export default MenuPopout;
