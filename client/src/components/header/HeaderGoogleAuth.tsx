import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppThunkDispatch } from "../../app/store";
import { authSelector, signIn } from "../../features/auth/authSlice";
import { emptyTodos, getTodos } from "../../features/todos/todosSlice";

type UserObjectType = { sub: string; name: string; picture: string };

const GoogleAuth = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();

  const { isSignedIn, userProfile } = useSelector(authSelector);

  const divRef = useRef(null);

  useEffect(() => {
    // On page load, checks if the user is still logged in

    let id: NodeJS.Timeout | number = 0;

    let credential: string | null = window.localStorage.getItem("credential");

    if (credential) {
      dispatch(signIn(jwtDecode(JSON.parse(credential))));
      // navigate("/dashboard");
    }

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    // Fetches or removes todos depending on login status

    if (isSignedIn && userProfile) {
      dispatch(getTodos(userProfile.userId));
    } else {
      dispatch(emptyTodos());
    }
  }, [isSignedIn, userProfile?.name]);

  const renderProfile = () => (
    <div className="flex justify-center me-2 me-sm-5">
      {userProfile?.img && (
        <img
          className="img-profile me-sm-1 me-2 rounded-circle"
          src={`${userProfile?.img}`}
        ></img>
      )}
      <h2 className="fs-5 name-heading mb-0 flex items-center">{`Hi, ${userProfile?.name}`}</h2>
    </div>
  );

  const handleResponse = (response: CredentialResponse["credential"]) => {
    if (response) {
      window.localStorage.setItem("credential", JSON.stringify(response));
      dispatch(signIn(jwtDecode(response)));
    }
  };

  return (
    <section
      className={`${isSignedIn ? "w-full" : "w-6/12"} flex justify-center`}
    >
      <div
        ref={divRef}
        className={`buttonSignIn ${
          isSignedIn ? "d-none" : "flex"
        } justify-center`}
      >
        <GoogleLogin
          onSuccess={({ credential }) => handleResponse(credential)}
          shape="circle"
          size="medium"
          type="standard"
        />
      </div>
    </section>
  );
};

export default GoogleAuth;
