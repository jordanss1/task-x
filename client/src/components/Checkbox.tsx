import { useField } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";

type CheckboxPropsType = {
  label: string;
  name: string;
};

const Checkbox = ({ label, ...props }: CheckboxPropsType): ReactElement => {
  const [field, meta] = useField(props);

  return (
    <motion.div
      animate={{ justifyContent: field.value ? "normal" : "space-between" }}
      className="flex justify-between gap-1"
    >
      <AnimatePresence initial={false} mode="wait">
        {!field.value && (
          <motion.label
            initial={{ x: -20, opacity: 0 }}
            animate={{
              opacity: 1,
              x: 0,
              whiteSpace: "nowrap",
              transition: { delay: 0.2 },
            }}
            exit={{ width: "0px", whiteSpace: "nowrap", opacity: 0 }}
            htmlFor="check"
            className="cursor-pointer"
            layoutDependency={field.value}
          >
            {label}
          </motion.label>
        )}
      </AnimatePresence>
      <motion.input
        transition={{ layout: { duration: 0.4 } }}
        className="accent-[#991FF1] cursor-pointer"
        id="check"
        type="checkbox"
        layoutDependency={field.value}
        checked={field.value}
        {...field}
      />
    </motion.div>
  );
};

export default Checkbox;
