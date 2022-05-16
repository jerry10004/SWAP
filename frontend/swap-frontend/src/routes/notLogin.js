import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Main from "../pages/Main";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Application from "../pages/Application";
import ProgramDetail from "../pages/ProgramDetail";
import ProgramPractice from "../pages/ProgramPractice";
import Terms from "../pages/terms";
import PersonalInfo from "../pages/PersonalInfo";

function Admin() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin/*" element={<Navigate replace to="/" />} />
        <Route path="/mypage" element={<Navigate replace to="/" />} />
        <Route path="/program/:id/application" element={<Application />} />
        <Route path="/program/:id" element={<ProgramDetail />} />
        <Route path="/programPractice" element={<ProgramPractice />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/personal-information" element={<PersonalInfo />} />
      </Routes>
    </>
  );
}

export default Admin;
