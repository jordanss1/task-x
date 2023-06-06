import { ReactElement } from "react";
import { ActionedTodoItemType } from "../../features/classes/classesSlice";
import { HandlePromptAndDeleteFunc } from "./TodoList";

type TodoItemComponentType = ({
  id,
  todo,
  handleDeleteTodo,
  handlePromptValue,
  actionedTodo,
}: {
  id: number;
  todo: string;
  handleDeleteTodo: HandlePromptAndDeleteFunc;
  handlePromptValue: HandlePromptAndDeleteFunc;
  actionedTodo: ActionedTodoItemType;
}) => ReactElement;

const TodoItem: TodoItemComponentType = ({
  id,
  todo,
  handleDeleteTodo,
  handlePromptValue,
  actionedTodo,
}) => {
  return (
    <article
      className={`todo-class ${
        actionedTodo?.id === id ? actionedTodo?.classProp : ""
      } border rounded-pill p-1 d-flex align-items-center justify-content-around mb-2`}
    >
      <p className="todo-text ms-3 ms-sm-0 ps-4 pt-2 fs-4">{todo}</p>
      <div className="ms-auto icon-holder">
        <i
          data-testid="edit-todo"
          className="icon-class rounded-pill bordered inverted black edit link icon"
          onClick={() => handlePromptValue(id)}
        ></i>
        <i
          data-testid="delete-todo"
          className="icon-class delete-icon bordered  rounded-pill inverted red close link icon"
          onClick={() => handleDeleteTodo(id)}
        ></i>
      </div>
    </article>
  );
};

export default TodoItem;
