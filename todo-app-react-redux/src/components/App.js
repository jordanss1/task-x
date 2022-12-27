import React from "react";
import Header from "./Header";
import TodoList from "./TodoList";
import TodoInputs from "./TodoInputs";
import { useSelector } from "react-redux";
import { authSelector } from "../features/auth/authSlice";

const App = () => {
  const { isSignedIn } = useSelector(authSelector);

  const justified = isSignedIn ? "justify-content-evenly" : "";

  return (
    <>
      <Header />
      <main
        className={`bottom-container d-flex flex-column align-items-center ${justified}`}
      >
        <TodoList />
        <TodoInputs />
      </main>
    </>
  );
};

export default App;
