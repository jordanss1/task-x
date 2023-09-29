import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../features/auth/authSlice";
import Landing from "./landing/Landing";
import TodoContainer from "./todos/TodoContainer";

const Main = (): ReactElement => {
  const { isSignedIn } = useSelector(authSelector);

  const renderContent = isSignedIn ? <TodoContainer /> : <Landing />;

  return renderContent;
};

export default Main;
