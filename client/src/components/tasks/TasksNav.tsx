import { ReactElement } from "react";

type TasksNavPropsType = {
  header: string;
};

const TasksNav = ({ header }: TasksNavPropsType): ReactElement => {
  return (
    <section>
      <h2>{header}</h2>
    </section>
  );
};

export default TasksNav;
