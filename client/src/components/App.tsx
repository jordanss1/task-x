import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactElement } from "react";
import "../styles/all.css";

const App = (): ReactElement => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_ID as string}>
    </GoogleOAuthProvider>
  );
};

export default App;
