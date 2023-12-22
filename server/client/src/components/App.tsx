import { AnimatePresence } from "framer-motion";
import { ReactElement, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AppThunkDispatch } from "../app/store";
import { getUser } from "../features/auth/authSlice";
import { errorsSelector, setError } from "../features/error/errorSlice";
import useRedirect from "../hooks/useRedirect";
import "../index.css";
import "../styles/all.css";
import Dashboard from "./dashboard/Dashboard";
import Landing from "./landing/Landing";
import Popup from "./popup/Popup";
import ProfileEdit from "./profile/profile-edit/ProfileEdit";
import ProfileSetup from "./profile/profile-setup/ProfileSetup";

const App = (): ReactElement => {
  useRedirect();
  const dispatch = useDispatch<AppThunkDispatch>();
  const { error } = useSelector(errorsSelector);

  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    clearTimeout(timer.current);

    if (error) {
      timer.current = setTimeout(() => dispatch(setError(null)), 3000);
    }
  }, [error]);

  return (
    <>
      <AnimatePresence mode="wait">
        {error && <Popup error={error} />}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/setup" element={<ProfileSetup />} />
        <Route path="profile/edit" element={<ProfileEdit />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
