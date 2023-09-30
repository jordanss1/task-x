import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../features/auth/authSlice";
import Header from "./header/Header";
import TodoContainer from "./todos/TodoContainer";
import TodoInputs from "./todos/TodoInputs";

const App = (): ReactElement => {
  const { isSignedIn } = useSelector(authSelector);

  const justified = isSignedIn ? "justify-content-evenly" : "";

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_ID as string}>
      <Header />
      <main
        className={`bottom-container d-flex flex-column align-items-center ${justified}`}
      >
        <TodoContainer />
        <TodoInputs />
      </main>
    </GoogleOAuthProvider>
  );
};

export default App;
