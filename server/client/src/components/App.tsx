import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AppThunkDispatch } from "../app/store";
import { getUser } from "../features/auth/authSlice";
import {
  interfaceSelector,
  updateProgress,
} from "../features/interface/interfaceSlice";
import "../index.css";
import "../styles/all.css";
import Dashboard from "./dashboard/Dashboard";
import Landing from "./landing/Landing";
import ProfileEdit from "./profile/profile-edit/ProfileEdit";
import ProfileSetup from "./profile/profile-setup/ProfileSetup";

const App = (): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const { progress } = useSelector(interfaceSelector);

  useEffect(() => {
    dispatch(getUser());

    if (progress) dispatch(updateProgress(0));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/setup" element={<ProfileSetup />} />
      <Route path="profile/edit" element={<ProfileEdit />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
