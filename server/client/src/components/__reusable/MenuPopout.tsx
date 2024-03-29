import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import MenuButton from "../svg/MenuButton";
import Button from "./Button";
import ModalBackground from "./ModalBackground";

type MenuPopoutPropsType = {
  children: ReactNode;
  className: string;
};

const MenuPopout = ({
  children,
  className,
}: MenuPopoutPropsType): ReactElement => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Button
        onClick={() => setExpanded((prev) => !prev)}
        className={`${className} ${expanded ? "popout_button_z_index" : ""}`}
      >
        <AnimatePresence>
          {expanded ? (
            <i className="fa-solid fa-xmark relative text-3xl p-1 rounded-md text-slate-400 hover:bg-slate-500 hover:text-slate-200" />
          ) : (
            <MenuButton />
          )}
        </AnimatePresence>
      </Button>
      <AnimatePresence>
        {expanded && (
          <ModalBackground
            key={1}
            blur
            onClick={() => setExpanded(false)}
            background="rgba(0,0,0,.1)"
            width={"34%"}
          />
        )}
        {expanded && children}
      </AnimatePresence>
    </>
  );
};

export default MenuPopout;
