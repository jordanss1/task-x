import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authSelector } from "../features/auth/authSlice";

const useRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(authSelector);

  useEffect(() => {
    const pathname = location.pathname;

    if (user === null) return;

    if (pathname === "/setup") renderSetupProfile();

    if (pathname === "/dashboard") renderProtected("/dashboard");

    if (pathname === "/profile/edit") renderProtected("/profile/edit");
  }, [user, location.pathname]);

  const renderSetupProfile = () => {
    if (user && !user.profile) navigate("/setup");
    else if (user && user.profile) navigate("/dashboard");
    else navigate("/");
  };

  const renderProtected = (path: string) => {
    if (user && user.profile) navigate(path);
    else if (user && !user.profile) navigate("/setup");
    else navigate("/");
  };
};

export default useRedirect;
