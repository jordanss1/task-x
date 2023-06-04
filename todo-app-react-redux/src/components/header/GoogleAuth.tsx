import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  signingIn,
  setLoading,
  authSelector,
} from "../../features/auth/authSlice";
import {
  getTodos,
  emptyTodos,
  AppThunkDispatch,
} from "../../features/todos/todosSlice";
import {
  classSelector,
  placeholderSet,
} from "../../features/classes/classesSlice";
import { usePreLoginLogout } from "../../hooks/LoginAndAuthHook";
import { GoogleLogin } from "@react-oauth/google";
import "../../style/header.css";

type UserObjectType = { sub: string; name: string; picture: string };

const GoogleAuth = () => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const { isSignedIn, userProfile, beenSignedIn, beenSignedOut } =
    useSelector(authSelector);

  const { initialClasses, signInButton, signOutButton } =
    useSelector(classSelector);

  const { signInOrOut, handleCallbackResponse, handleSignOut } =
    usePreLoginLogout();

  const divRef = useRef(null);

  useEffect(() => {
    // On page load, checks if the user is still logged in

    let id: NodeJS.Timeout | number = 0;

    let userObject: string | UserObjectType | null =
      window.localStorage.getItem("user");

    if (userObject) {
      userObject = JSON.parse(userObject as string);
      dispatch(setLoading(true));
      dispatch(signingIn());
      dispatch(signIn(userObject as UserObjectType));

      id = setTimeout(() => {
        dispatch(placeholderSet(""));
        dispatch(setLoading(false));
      }, 2500);
    }

    return () => clearTimeout(id);
  }, [isSignedIn]);

  useEffect(() => {
    // Fetches or removes todos depending on login status

    if (isSignedIn && userProfile) {
      dispatch(getTodos(userProfile.userId));
    } else {
      dispatch(emptyTodos());
    }
  }, [isSignedIn, userProfile]);

  useEffect(() => {
    // Animates the button containers when sign in begins

    let id: NodeJS.Timeout;

    id = signInOrOut("signingIn");

    return () => clearTimeout(id);
  }, [beenSignedIn]);

  useEffect(() => {
    // Animates the button containers when sign out begins

    let id: NodeJS.Timeout;

    id = signInOrOut("signingOut");

    return () => clearTimeout(id);
  }, [beenSignedOut]);

  const signInButtonClass = `${initialClasses?.button} ${signInButton}`;

  const renderSignOutButton = () => (
    <div className="d-flex align-items-center me-3">
      <button
        id="button"
        onClick={handleSignOut}
        className="ui labeled icon button p-2"
      >
        <div className="d-flex justify-content-center flex-row">
          <p className="mb-0">Sign out</p>
          <i className="google icon fs-4 pt-1 ps-2" />
        </div>
      </button>
    </div>
  );

  const renderProfile = () => (
    <div className="d-flex justify-content-center me-2 me-sm-5">
      {userProfile?.img && (
        <img
          className="img-profile me-sm-1 me-2 rounded-circle"
          src={`${userProfile?.img}`}
        ></img>
      )}
      <h2 className="fs-5 name-heading mb-0 d-flex align-items-center">{`Hi, ${userProfile?.name}`}</h2>
    </div>
  );

  return (
    <section
      className={`${
        isSignedIn ? "w-100" : "w-50"
      } d-flex justify-content-center`}
    >
      <div
        ref={divRef}
        className={`buttonSignIn ${
          isSignedIn ? "d-none" : "d-flex"
        } justify-content-center ${signInButtonClass}`}
      >
        <GoogleLogin
          onSuccess={(response) => handleCallbackResponse(response)}
          shape="circle"
          size="medium"
          type="standard"
        />
      </div>

      <section
        className={`d-flex buttonSignOut w-100 justify-content-sm-center justify-content-around ${signOutButton}`}
      >
        {userProfile && renderProfile()}
        {isSignedIn && renderSignOutButton()}
      </section>
    </section>
  );
};

export default GoogleAuth;
