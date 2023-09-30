import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store";
import App from "./components/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
