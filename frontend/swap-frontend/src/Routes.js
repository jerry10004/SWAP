import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Import core SCSS styles
import "assets/scss/theme.scss";

import Main from "./pages/Main";
import Program from "./pages/Program";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/program" element={<Program />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
