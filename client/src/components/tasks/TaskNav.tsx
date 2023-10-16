import { ReactElement } from "react";

type TodoHeaderPropsType = {
  header: string;
};

const TodoHeader = ({ header }: TodoHeaderPropsType): ReactElement => {
  return (
    <section>
      <h2>{header}</h2>
    </section>
  );
};

export default TodoHeader;
