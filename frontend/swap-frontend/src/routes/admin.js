import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "../pages/Main";
import "assets/scss/theme.scss";
import AddProgram from "../pages/AddProgram";
import AddSurvey from "../pages/AddSurvey";
import ManageApplication from "../pages/ManageApplication";
import ManageApplicationDetail from "../pages/ManageApplicationDetail";
import ManageSurvey from "../pages/ManageSurvey";
import ManageSurveyDetail from "../pages/ManageSurveyDetail";
import ManageStudent from "../pages/ManageStudent";
import ManageUser from "../pages/ManageUser";
import ManageInstructor from "../pages/ManageInstructor";
import ManageProgram from "../pages/ManageProgram";
import AdminProgramDetail from "../pages/AdminProgramDetail";
import ApplicationFormView from "components/dashboard/single/overview/ApplicationFormView";
import AdminMain from "../pages/ManageProgram";
import AddTemplate from "../pages/AddTemplate";

import Application from "../pages/Application";
import Survey from "../pages/Survey";
import ProgramDetail from "../pages/ProgramDetail";
import MyPageLayout from "../pages/MyPageLayout";
import Terms from "../pages/terms";
import PersonalInfo from "../pages/PersonalInfo";

function Admin() {
  return (
    <Routes>
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/addprogram"} element={<AddProgram />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/addtemplate"} element={<AddTemplate />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/addsurvey"} element={<AddSurvey />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin"} element={<AdminMain />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/application"} element={<ManageApplication />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/application/detail/:id"} element={<ManageApplicationDetail />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/survey"} element={<ManageSurvey />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/survey/detail/:id"} element={<ManageSurveyDetail />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/student"} element={<ManageStudent />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/instructor"} element={<ManageInstructor />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/user"} element={<ManageUser />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/program"} element={<ManageProgram />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/program/detail/:id"} element={<AdminProgramDetail />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/program/detail/:id/:applicantid"} element={<ApplicationFormView />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"/"} element={<Main />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"main"} element={<Main />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"program/:id/application"} element={<Application />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"program/:id/survey"} element={<Survey />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"program/:id"} element={<ProgramDetail />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"mypage"} element={<MyPageLayout />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"terms-and-conditions"} element={<Terms />} />
      <Route path={process.env.REACT_APP_DEFAULT_URL+"personal-information"} element={<PersonalInfo />} />
    </Routes>
  );
}

export default Admin;
