import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import Application from "../pages/Application";
import Survey from "../pages/Survey";
import ProgramDetail from "../pages/ProgramDetail";
import MyPageLayout from "../pages/MyPageLayout";
import Terms from "../pages/terms";
import PersonalInfo from "../pages/PersonalInfo";

function Admin() {
  return (
    <>
      <Routes>
        <Route path={process.env.REACT_APP_DEFAULT_URL} element={<Main />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL+"main"} element={<Main />} />
        {/* <Route path="/mypage" element={<MyPage />} /> */}
        <Route path={process.env.REACT_APP_DEFAULT_URL+"admin/*"} element={<Navigate replace to="/" />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL+"program/:id/application"} element={<Application />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL+"program/:id/survey"} element={<Survey />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL+"program/:id"} element={<ProgramDetail />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL+"mypage"} element={<MyPageLayout />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL+"terms-and-conditions"} element={<Terms />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL+"personal-information"} element={<PersonalInfo />} />
      </Routes>
    </>
  );
}

export default Admin;
