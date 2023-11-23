import { ReactElement } from "react";
import { CommentType } from "../../../../types";
import TaskWallTaskInput from "./TaskWallTaskInput";

type TaskWallTaskCommentContainerPropsType = {
  comments: CommentType[];
};

const TaskWallTaskCommentContainer = ({
  comments,
}: TaskWallTaskCommentContainerPropsType): ReactElement => {
  return (
    <section className="mt-3 rounded-2xl bg-slate-300 flex flex-col">
      <div className=" p-2 flex justify-center items-center w-full h-14">
        <TaskWallTaskInput />
      </div>
    </section>
  );
};

export default TaskWallTaskCommentContainer;
