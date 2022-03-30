import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Import core SCSS styles
import "assets/scss/theme.scss";

import Main from "./pages/Main";

import Application from "./pages/Application";
import Program from "./pages/Program";
import Survey from "./pages/Survey";
import MyPage from "./pages/MyPage";
import AddProgram from "./pages/AddProgram";
import ManageStudent from "./pages/ManageStudent";
import ManageUser from "./pages/ManageUser";
import ManageInstructor from "./pages/ManageInstructor";
import ManageProgram from "./pages/ManageProgram";
import AdminProgramDetail from "./pages/AdminProgramDetail";
import Admin from "./pages/Admin";
import Test from "./pages/Test";

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
        <Route path="/admin/addprogram" element={<AddProgram />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/student" element={<ManageStudent />} />
        <Route path="/admin/instructor" element={<ManageInstructor />} />
        <Route path="/admin/user" element={<ManageUser />} />
        <Route path="/admin/program" element={<ManageProgram />} />
        <Route path="/admin/program/detail" element={<AdminProgramDetail />} />
        <Route path="/admin/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
