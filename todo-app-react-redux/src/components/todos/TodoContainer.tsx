import { useEffect, useState, useCallback, ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTodo, AppThunkDispatch } from "../../features/todos/todosSlice";
import { todoContainerSet } from "../../features/classes/classesSlice";
import { classSelector } from "../../features/classes/classesSlice";
import { authSelector } from "../../features/auth/authSlice";
import "../../style/body.css";
import { useTodosHook } from "../../hooks/TodoHook";
import TodoPlaceholder from "./TodoPlaceholder";
import TodoListWithTodos from "./TodoListWithTodos";

export type HandlePromptAndDeleteFunc = (id: number) => void;

const TodoContainer = (): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const { isSignedIn, loading } = useSelector(authSelector);
  const { todoContainer, loginContainer, placeholder } =
    useSelector(classSelector);

  const { empty, fullTodos } = useTodosHook();

  const [promptValue, setPromptValue] = useState<string | null>("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    // Class added after loading is complete

    if (isSignedIn && !loading && !empty) {
      dispatch(todoContainerSet("todos-in"));
    }
  }, [loading]);

  useEffect(() => {
    // Updates todo item

    if (promptValue && editId) {
      const editObject = { editId, promptValue };
      dispatch(editTodo(editObject));
    }
  }, [editId, promptValue]);

  const handlePromptValue: HandlePromptAndDeleteFunc = useCallback((id) => {
    setPromptValue(prompt("Edit todo and submit"));
    setEditId(id);
  }, []);

  // Login page when not signed in

  if (!isSignedIn) {
    return (
      <section
        className={`d-flex start-container ${loginContainer} align-items-center w-100 flex-column px-3 py-3`}
      >
        <article className="message-div d-flex align-items-center justify-content-center ">
          <h2 className="message fs-3">Login to view and create todos..</h2>
        </article>
      </section>
    );
  } else if (isSignedIn && fullTodos?.length && !loading) {
    return (
      <TodoListWithTodos
        fullTodos={fullTodos}
        handlePromptValue={handlePromptValue}
      />
    );
  } else if (isSignedIn && !fullTodos?.length && !loading) {
    // After loading is complete and when todos don't exist

    return (
      <section
        id="no-todos-container"
        className={`todo-container2 ${todoContainer} d-flex align-items-center justify-content-center`}
      >
        <div className="message-div no-todos d-flex align-items-center justify-content-center ">
          <h2 className="message fs-3">Start creating todos!</h2>
        </div>
      </section>
    );
  } else if (isSignedIn && loading && placeholder) {
    return <TodoPlaceholder placeholder={placeholder} />;
  } else {
    return <TodoPlaceholder placeholder={placeholder} />;
  }
};

export default TodoContainer;
