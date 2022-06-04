import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthProivider from "./context/AuthContext";
import Settings from "./pages/Settings";
import SettingsProivider from "./context/SettingsContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18next.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProivider>
          <SettingsProivider>
            <App />
          </SettingsProivider>
        </AuthProivider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
