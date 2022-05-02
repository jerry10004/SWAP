import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Import core SCSS styles
import "assets/scss/theme.scss";

import Main from "../pages/Main";

import Application from "../pages/Application";
import Program from "../pages/ProgramDetail";
import ProgramDetail from "../pages/ProgramDetail";
import Survey from "../pages/Survey";
import MyPage from "../pages/MyPage";
import AddProgram from "../pages/AddProgram";
import ManageApplication from "../pages/ManageApplication";
import ManageApplicationDetail from "../pages/ManageApplicationDetail";
import ManageStudent from "../pages/ManageStudent";
import ManageUser from "../pages/ManageUser";
import ManageInstructor from "../pages/ManageInstructor";
import ManageProgram from "../pages/ManageProgram";
import AdminProgramDetail from "../pages/AdminProgramDetail";
import ApplicationFormView from "components/dashboard/single/overview/ApplicationFormView";
import Admin from "../pages/Admin";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProgramPractice from "../pages/ProgramPractice";
import MyPageLayout from "../pages/MyPageLayout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/program/:id/application" element={<Application />} />
        <Route path="/program" element={<Program />} />
        <Route path="/program/:id" element={<ProgramDetail />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/admin/addprogram" element={<AddProgram />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/application" element={<ManageApplication />} />
        <Route path="/admin/application/detail/:id" element={<ManageApplicationDetail />} />
        <Route path="/admin/student" element={<ManageStudent />} />
        <Route path="/admin/instructor" element={<ManageInstructor />} />
        <Route path="/admin/user" element={<ManageUser />} />
        <Route path="/admin/program" element={<ManageProgram />} />
        <Route path="/admin/program/detail/:id" element={<AdminProgramDetail />} />
        <Route path="/admin/program/detail/:id/:applicantid" element={<ApplicationFormView />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/programPractice" element={<ProgramPractice />} />
        <Route path="/mypagelayout" element={<MyPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
