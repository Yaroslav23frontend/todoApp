import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthProivider from "./context/AuthContext";
import Settings from "./pages/Settings";
import SettingsProivider from "./context/SettingsContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProivider>
        <SettingsProivider>
          <App />
        </SettingsProivider>
      </AuthProivider>
    </Provider>
  </React.StrictMode>
);
