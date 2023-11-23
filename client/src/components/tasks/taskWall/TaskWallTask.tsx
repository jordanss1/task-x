import { motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { TaskWallTaskType, UserType } from "../../../types";
import TaskWallTaskInteraction from "./TaskWallTaskInteraction";
import TaskWallTaskStatus from "./TaskWallTaskStatus";
import TaskWallTaskTask from "./TaskWallTaskTask";
import TaskWallTaskCommentContainer from "./taskWallComments/TaskWallTaskCommentContainer";

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
  const [openComments, setOpenComments] = useState(false);

  return (
    <motion.div
      style={{ boxShadow: "1px 1px 2px black, -1px -1px 2px black" }}
      className="min-h-[15rem] w-full max-w-3xl flex flex-col gap-5 p-3 rounded-2xl"
    >
      <TaskWallTaskStatus
        awards={task.awards}
        dueDate={task.dueDate}
        created={task.created}
        user={user[0]}
      />
      <TaskWallTaskTask task={task.task} />
      <TaskWallTaskInteraction
        likes={task.likes}
        openComments={openComments}
        handleComments={setOpenComments}
        commentAmount={task.comments.length}
      />
      {openComments && <TaskWallTaskCommentContainer comments={task.comments} />}
    </motion.div>
  );
};

export default TaskWallTask;
