import { ReactElement } from "react";

type TaskNavPropsType = {
  header: string;
};

const TaskNav = ({ header }: TaskNavPropsType): ReactElement => {
  return (
    <section>
      <h2>{header}</h2>
    </section>
  );
};

export default TaskNav;
