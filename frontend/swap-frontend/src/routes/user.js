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
        <Route path="main" element={<Main />} />
        {/* <Route path="/mypage" element={<MyPage />} /> */}
        <Route path="admin/*" element={<Navigate replace to="/" />} />
        <Route path="program/:id/application" element={<Application />} />
        <Route path="program/:id/survey" element={<Survey />} />
        <Route path="program/:id" element={<ProgramDetail />} />
        <Route path="mypage" element={<MyPageLayout />} />
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="personal-information" element={<PersonalInfo />} />
      </Routes>
    </>
  );
}

export default Admin;
