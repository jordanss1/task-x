import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import { useScreenSize } from "../../../hooks/MediaQueryHooks";
import useSortTasks from "../../../hooks/useSortTasks";
import TaskListTask from "./TaskListTask";

type TaskListCategoryType = {
  sortBy: "Due" | "Not due" | "Complete";
};

const TaskListCategory = ({ sortBy }: TaskListCategoryType): ReactElement => {
  const tasks = useSortTasks({ sortBy });
  const screenWidth = useScreenSize();

  const taskAmount =
    screenWidth > 923 ? 4 : screenWidth > 573 ? 3 : screenWidth > 532 ? 2 : 1;

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
        <div
          key={3}
          style={{
            justifyItems: tasks?.length < taskAmount ? "left" : "center",
            gridTemplateColumns:
              tasks.length < taskAmount
                ? "repeat(auto-fit, minmax(200px, 220px))"
                : "repeat(auto-fit, minmax(200px, 1fr))",
            rowGap: "60px",
          }}
          className="grid gap-8 px-1 py-5 min-h-[222px]"
        >
          {tasks.map((taskItem, i) => (
            <TaskListTask key={i} index={i} taskItem={taskItem} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskListCategory;
