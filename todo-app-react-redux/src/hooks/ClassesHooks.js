import { useDispatch } from "react-redux";
import {
  signInButtonSet,
  signOutButtonSet,
} from "../features/classes/classesSlice";

const useClassesHook = () => {
  const dispatch = useDispatch();

  const setAuthButton = (status) => {
    const signInButton =
      status === "signingIn" ? "signInButton-out" : "signInButton-in";
    const signOutButton =
      status === "signingIn" ? "signOutButton-in" : "signOutButton-out";

    dispatch(signInButtonSet(signInButton));
    dispatch(signOutButtonSet(signOutButton));
  };

  return { setAuthButton };
};

export default useClassesHook;
