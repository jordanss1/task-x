import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, ReactElement } from "react";

type CheckboxPropsType = {
  label: string;
  enableDueDate: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
  label,
  enableDueDate,
  onChange,
}: CheckboxPropsType): ReactElement => {
  return (
    <div className="flex justify-between gap-1">
      <AnimatePresence initial={false} mode="wait">
        {!enableDueDate && (
          <motion.label
            initial={{ width: "0px", x: -20, opacity: 0 }}
            animate={{
              width: "auto",
              opacity: 1,
              x: 0,
              whiteSpace: "nowrap",
              transition: { delay: 0.2 },
            }}
            exit={{ width: "0px", whiteSpace: "nowrap", opacity: 0 }}
            htmlFor="check"
            className="cursor-pointer"
          >
            {label}
          </motion.label>
        )}
      </AnimatePresence>
      <input
        onChange={onChange}
        className="accent-[#991FF1] cursor-pointer"
        id="check"
        type="checkbox"
        checked={enableDueDate}
      />
    </div>
  );
};

export default Checkbox;
