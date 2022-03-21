import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Import core SCSS styles
import "assets/scss/theme.scss";

import Main from "./pages/Main";
import Application from "./pages/Application";
import Program from "./pages/Program";
import Survey from "./pages/Survey";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/application" element={<Application />} />
        <Route path="/program" element={<Program />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
