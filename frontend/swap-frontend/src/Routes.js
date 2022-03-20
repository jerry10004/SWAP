import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Import core SCSS styles
import "assets/scss/theme.scss";

import Main from "./pages/Main";
import Application from "./pages/Application";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/application" element={<Application />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
