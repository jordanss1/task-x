import { useDispatch } from "react-redux";
import {
  signInButtonSet,
  signOutButtonSet,
  initialClassesAdd,
  initialClassesRemove,
  loginContainerSet,
} from "../features/classes/classesSlice";

type SetAuthButtonType = (status: "signingIn" | "signingOut") => void;

type InitialClassesFuncType = () => NodeJS.Timeout;

type ClassesHookType = () => {
  setAuthButtonClasses: SetAuthButtonType;
  initialClassesFunc: InitialClassesFuncType;
};

const useClassesHook: ClassesHookType = () => {
  const dispatch = useDispatch();

  const initialClassesFunc = () => {
    // Classes to be added only on initial rendering

    dispatch(initialClassesAdd());
    dispatch(loginContainerSet("start-ani"));

    let id = setTimeout(() => {
      dispatch(initialClassesRemove());
    }, 3000);

    return id;
  };

  const setAuthButtonClasses: SetAuthButtonType = (status) => {
    const signInButton =
      status === "signingIn" ? "signInButton-out" : "signInButton-in";
    const signOutButton =
      status === "signingIn" ? "signOutButton-in" : "signOutButton-out";

    dispatch(signInButtonSet(signInButton));
    dispatch(signOutButtonSet(signOutButton));
  };

  return { setAuthButtonClasses, initialClassesFunc };
};

export default useClassesHook;
