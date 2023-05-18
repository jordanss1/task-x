import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  signIn,
  signOut,
  authSelector,
  signingIn,
  signingOut,
} from "../features/auth/authSlice";
import {
  todoContainerSet,
  placeholderSet,
  formClassSet,
  loginContainerSet,
} from "../features/classes/classesSlice";
import useClassesHook from "./ClassesHooks";
import jwtDecode from "jwt-decode";

export const usePreLoginLogout = () => {
  // Functions and side effects for pre-login and log-out such as classes and dispatching ACTUAL login and logout

  const { beenSignedIn, beenSignedOut } = useSelector(authSelector);
  const { setAuthButtonClasses } = useClassesHook();
  const dispatch = useDispatch();

  useEffect(() => {
    // Classes added when sign-in/out buttons are pressed

    if (beenSignedIn) {
      dispatch(loginContainerSet("signIn-container"));
      dispatch(placeholderSet("loading-ani"));
      dispatch(formClassSet("form-ani-signIn"));
    }

    if (beenSignedOut) {
      dispatch(loginContainerSet("signOut-container"));
      dispatch(todoContainerSet("todos-out"));
      dispatch(formClassSet("form-ani-signOut"));
    }
  }, [beenSignedIn, beenSignedOut]);

  // Animates the button containers when sign in/out begins and dispatches actual sign in/out

  const signInOrOut = (status) => {
    let id;

    const userObject = JSON.parse(window.localStorage.getItem("user"));

    const statusGuard =
      status === "signingIn" ? beenSignedIn && userObject : beenSignedOut;

    if (statusGuard) {
      setAuthButtonClasses(status);

      id = setTimeout(() => {
        dispatch(status === "signingIn" ? signIn(userObject) : signOut());
      }, 500);
    }

    return id;
  };

  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    window.localStorage.setItem("user", JSON.stringify(userObject));
    dispatch(signingIn());
  };

  const handleSignOut = () => {
    window.localStorage.removeItem("user");
    dispatch(signingOut());
  };

  return { signInOrOut, handleCallbackResponse, handleSignOut };
};
