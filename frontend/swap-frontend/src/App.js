import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import React from "react";

import Admin from "./routes/admin";
import NotLogin from "./routes/notLogin";
import User from "./routes/user";

function App() {
  const today = new Date();
  axios.interceptors.request.use(
    function (config) {
      const path = window.location.href.replace(process.env.REACT_APP_DEFAULT_WHOLE_URL, "");

      return config;
    },
    function (error) {}
  );

  return (
    <>
      <BrowserRouter>
        {window.sessionStorage.getItem("token") !== null &&
        (parseInt(window.sessionStorage.getItem("status")) === 0 || parseInt(window.sessionStorage.getItem("status")) === -2) &&
        window.sessionStorage.getItem("expires_at") >= today.getTime() ? (
          <Admin />
        ) : window.sessionStorage.getItem("token") !== null && parseInt(window.sessionStorage.getItem("status")) === 1 && window.sessionStorage.getItem("expires_at") >= today.getTime() ? (
          <User />
        ) : (
          <NotLogin />
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
