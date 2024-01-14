import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";
import { fonts } from "../../../constants";
import { useScreenSize } from "../../../hooks/MediaQueryHooks";
import useSortTasks from "../../../hooks/useSortTasks";
import { TaskWallTaskType } from "../../../types";
import TaskListTask from "./TaskListTask";

type TaskListCategoryType = {
  sortBy: "Due" | "Not due" | "Complete";
  userTaskWallTasks: TaskWallTaskType[] | false | null;
};

const TaskListCategory = ({
  sortBy,
  userTaskWallTasks,
}: TaskListCategoryType): ReactElement => {
  const tasks = useSortTasks({ sortBy });
  const screenWidth = useScreenSize();

  return (
    <section className="pt-10">
      <h3
        style={{
          color: "rgb(50,50,50)",
          fontFamily: fonts.jura,
          letterSpacing: ".5px",
        }}
        className="text-sm py-1 ps-[1px]"
      >
        {sortBy}
      </h3>
      <div
        style={{
          background: tasks ? "rgb(50,50,50)" : "rgb(100,100,100)",
          height: ".7px",
        }}
        className="rounded-3xl"
      />
      {tasks && (
        <motion.div
          layout
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 220px))",
            justifyContent: screenWidth < 580 ? "center" : "normal",
            rowGap: "60px",
          }}
          className="grid gap-8 px-1 py-5 min-h-[222px]"
        >
          <AnimatePresence>
            {tasks.map((taskItem, i) => {
              let matchingUserWallTask: TaskWallTaskType | boolean | undefined =
                false;

              matchingUserWallTask = !userTaskWallTasks
                ? false
                : userTaskWallTasks.find(
                    ({ taskId }) => taskId === taskItem.taskId
                  );

              return (
                <TaskListTask
                  key={taskItem.taskId}
                  matchingUserWallTask={matchingUserWallTask || false}
                  index={i}
                  taskItem={taskItem}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

export default TaskListCategory;