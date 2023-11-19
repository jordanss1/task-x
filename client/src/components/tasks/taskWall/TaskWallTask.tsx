import { motion } from "framer-motion";
import { ReactElement } from "react";
import { TaskWallTaskType, UserType } from "../../../types";
import TaskWallTaskStatus from "./TaskWallTaskStatus";

const users: UserType[] = [
  {
    userId: "1943",
    userName: "johnnyappleseed",
    picture: "/src/assets/profile-photos/person-4.svg",
  },
  {
    userId: "309",
    userName: "jonjones22",
    picture: "/src/assets/profile-photos/person-9.svg",
  },
  {
    userId: "43",
    userName: "sallyg1997",
    picture: "/src/assets/profile-photos/person-5.svg",
  },
  {
    userId: "2003",
    userName: "fisher5000",
    picture: "/src/assets/profile-photos/person-17.svg",
  },
];

type TaskWallTaskPropsType = {
  task: TaskWallTaskType;
};

const TaskWallTask = ({ task }: TaskWallTaskPropsType): ReactElement => {
  const user = users.filter((user) => user.userId === task.userId);

  return (
    <motion.div
      style={{ boxShadow: "1px 1px 2px black, -1px -1px 2px black" }}
      className="h-52 w-full max-w-3xl flex flex-col p-3 rounded-2xl"
    >
      <TaskWallTaskStatus
        awards={task.awards}
        dueDate={task.dueDate}
        user={user[0]}
      />
    </motion.div>
  );
};

export default TaskWallTask;
