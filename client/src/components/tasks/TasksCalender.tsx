import { Dayjs } from "dayjs";
import { AnimatePresence, MotionProps, motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { colors, fonts } from "../../constants";
import Calendar from "../Calendar";
import Checkbox from "../Checkbox";

interface TasksCalenderPropsType extends MotionProps {
  taskDueEnabled: boolean;
  handleDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  className?: string;
}

const TasksCalender = ({
  taskDueEnabled,
  className,
  handleDate,
  ...props
}: TasksCalenderPropsType): ReactElement => {
  const [enableDueDate, setEnableDueDate] = useState(taskDueEnabled);

  return (
    <motion.div layout className={className} {...props}>
      <motion.div
        layout
        style={{
          color: colors.whiteShades[2],
          fontFamily: fonts.orbitron,
          flex: enableDueDate ? 0 : 2,
        }}
        className="text-xs cursor-pointer"
      >
        <Checkbox
          enableDueDate={enableDueDate}
          onChange={({ target }) => setEnableDueDate(target.checked)}
          label={"Enable due date"}
        />
      </motion.div>
      <AnimatePresence initial={false} mode="sync">
        {enableDueDate && (
          <motion.div
            className="inset-0"
            initial={{ flex: 0, opacity: 0 }}
            animate={{
              flex: 1,
              opacity: 1,
              width: "100%",
              transition: { delay: 0.1 },
            }}
            exit={{
              flex: 0,
              opacity: 0,
              width: "0%",
              scale: 0,
              position: "absolute",
              transition: {
                position: { delay: 0.2 },
              },
            }}
            layout
          >
            <Calendar setDate={handleDate} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TasksCalender;
