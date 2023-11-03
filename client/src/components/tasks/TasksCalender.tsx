import dayjs from "dayjs";
import { FormikProps } from "formik";
import { AnimatePresence, MotionProps, Variants, motion } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { colors, fonts } from "../../constants";
import Calendar from "../Calendar";
import Checkbox from "../Checkbox";

const calendarVariants: Variants = {
  initial: { flex: 0, opacity: 0, width: "0%" },
  animate: {
    flex: 1,
    opacity: 1,
    width: "100%",
    transition: { delay: 0.1 },
  },
  exit: {
    flex: 0,
    opacity: 0,
    width: "0%",
    scale: 0,
    position: "absolute",
    transition: {
      duration: .4,
      width: { duration: 0.1 },
      opacity: { duration: 0.1 },
      position: { delay: 0.2 },
    },
  },
};

interface TasksCalenderPropsType extends MotionProps {
  formikProps: FormikProps<any>;
  className?: string;
}

const TasksCalender = ({
  className,
  formikProps,
  ...props
}: TasksCalenderPropsType): ReactElement => {
  const { enabledDueDate } = formikProps.values;

  useEffect(() => {
    const { setFieldValue } = formikProps;

    if (enabledDueDate) {
      setFieldValue("dueDate", dayjs().add(1, "hour"));
    } else {
      setFieldValue("dueDate", undefined);
    }
  }, [enabledDueDate]);

  return (
    <motion.div layout className={className} {...props}>
      <motion.div
        layout
        style={{
          color: colors.whiteShades[2],
          fontFamily: fonts.orbitron,
          flex: enabledDueDate ? 0 : 2,
        }}
        className="text-xs cursor-pointer"
      >
        <Checkbox name="enabledDueDate" label={"Enable due date"} />
      </motion.div>
      <AnimatePresence initial={false} mode="sync">
        {enabledDueDate && (
          <motion.div
            variants={calendarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="inset-0"
            layout
          >
            <Calendar name="dueDate" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TasksCalender;
