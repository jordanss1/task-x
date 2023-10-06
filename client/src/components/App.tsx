import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import "../styles/all.css";
import Dashboard from "./dashboard/Dashboard";
import Landing from "./landing/Landing";

const App = (): ReactElement => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_ID as string}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
