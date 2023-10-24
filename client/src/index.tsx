import { ThemeProvider, createTheme } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store";
import App from "./components/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
  },
});

root.render(
  <Router>
    <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
      <App />
      {/* </ThemeProvider> */}
    </Provider>
  </Router>
);
