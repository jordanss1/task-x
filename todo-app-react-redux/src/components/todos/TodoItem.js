import React from "react";

const TodoItem = ({
  id,
  todo,
  handleDeleteTodo,
  handlePromptValue,
  actionedTodo,
}) => {
  return (
    <article
      className={`todo-class ${
        actionedTodo.id === id ? actionedTodo.classProp : ""
      } border rounded-pill p-1 d-flex align-items-center justify-content-around mb-2`}
    >
      <p className="todo-text ms-3 ms-sm-0 ps-4 pt-2 fs-4">{todo}</p>
      <div className="ms-auto icon-holder">
        <i
          className="icon-class  rounded-pill bordered inverted black edit link icon"
          onClick={() => handlePromptValue(id)}
        ></i>
        <i
          className="icon-class delete-icon bordered  rounded-pill inverted red close link icon"
          onClick={() => handleDeleteTodo(id)}
        ></i>
      </div>
    </article>
  );
};

export default TodoItem;