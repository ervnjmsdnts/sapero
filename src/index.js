import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.css";
import App from "./App";
import { SWRConfig } from "swr";
import swrConfig from "./lib/swrConfig";
import AuthProvider from "./context/authContext";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={swrConfig}>
      <AuthProvider>
        <Toaster />
        <App />
      </AuthProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);
