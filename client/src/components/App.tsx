import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import "../index.css";
import "../styles/all.css";
import Dashboard from "./dashboard/Dashboard";
import Landing from "./landing/Landing";
import ProfileEdit from "./profile/profile-edit/ProfileEdit";
import ProfileSetup from "./profile/profile-setup/ProfileSetup";

const App = (): ReactElement => {
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
    >
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/setup" element={<ProfileSetup />} />
        <Route path="profile/edit" element={<ProfileEdit />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
