import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactElement } from "react";
import "../styles/all.css";
import Footer from "./Footer";
import Main from "./Main";
import Header from "./header/Header";

const App = (): ReactElement => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_ID as string}>
      <Header />
      <Main />
      <Footer />
    </GoogleOAuthProvider>
  );
};

export default App;
