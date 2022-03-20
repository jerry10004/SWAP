import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Import core SCSS styles
import "assets/scss/theme.scss";

import Main from "./pages/Main";
import Application from "./pages/Application";
import Program from "./pages/Program";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/application" element={<Application />} />
        <Route path="/" element={<Main />} />
        <Route path="/program" element={<Program />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
