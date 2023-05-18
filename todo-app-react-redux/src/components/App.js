import React from "react";
import Header from "./header/Header";
import TodoList from "./todos/TodoList";
import TodoInputs from "./todos/TodoInputs";
import { useSelector } from "react-redux";
import { authSelector } from "../features/auth/authSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const { isSignedIn } = useSelector(authSelector);

  const justified = isSignedIn ? "justify-content-evenly" : "";

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_ID}>
      <Header />
      <main
        className={`bottom-container d-flex flex-column align-items-center ${justified}`}
      >
        <TodoList />
        <TodoInputs />
      </main>
    </GoogleOAuthProvider>
  );
};

export default App;
