import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import "../styles/all.css";
import Landing from "./landing/Landing";

const App = (): ReactElement => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_ID as string}>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
