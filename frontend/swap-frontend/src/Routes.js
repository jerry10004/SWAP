import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Import core SCSS styles
import "assets/scss/theme.scss";

import Main from "./pages/Main";

import Application from "./pages/Application";
import Program from "./pages/Program";
import Survey from "./pages/Survey";
import MyPage from "./pages/MyPage";
import ManageStudent from "./pages/ManageStudent";
import AddInstructor from "pages/AddInstructor";
import ManageInstructor from "./pages/ManageInstructor";
import ManageProgram from "./pages/ManageProgram";
import Admin from "./pages/Admin";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/program/application" element={<Application />} />
        <Route path="/program" element={<Program />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/managestudent" element={<ManageStudent />} />
        <Route path="/admin/manageinstructor" element={<ManageInstructor />} />
        <Route path="/admin/addinstructor" element={<AddInstructor />} />
        <Route path="/admin/manageprogram" element={<ManageProgram />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
