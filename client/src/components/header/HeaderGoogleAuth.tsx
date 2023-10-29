import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppThunkDispatch } from "../../app/store";

type UserObjectType = { sub: string; name: string; picture: string };

const GoogleAuth = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();

  const divRef = useRef(null);

  useEffect(() => {
    // On page load, checks if the user is still logged in

    let id: NodeJS.Timeout | number = 0;

    let credential: string | null = window.localStorage.getItem("credential");

    if (credential) {
      // navigate("/dashboard");
    }

    return () => clearTimeout(id);
  }, []);

  return (
    <section className="w-6/12 flex justify-center">
      <div
        ref={divRef}
        className="buttonSignIn flex
         justify-center"
      >
        <GoogleLogin
          onSuccess={({ credential }) => console.log(credential)}
          shape="circle"
          size="medium"
          type="standard"
        />
      </div>
    </section>
  );
};

export default GoogleAuth;
