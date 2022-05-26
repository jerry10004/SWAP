import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Main from "../pages/Main";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Application from "../pages/Application";
import ProgramDetail from "../pages/ProgramDetail";
import Terms from "../pages/terms";
import PersonalInfo from "../pages/PersonalInfo";

function Admin() {
  return (
    <>
      <Routes>
        <Route path={process.env.REACT_APP_DEFAULT_URL} element={<Main />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL + "main"} element={<Main />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL + "sign-in"} element={<SignIn />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL + "sign-up"} element={<SignUp />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL + "admin/*"} element={<Navigate replace to="/swap/" />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL + "mypage"} element={<Navigate replace to="/swap/" />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL + "program/:id/application"} element={<Application />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL + "program/:id"} element={<ProgramDetail />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL + "terms-and-conditions"} element={<Terms />} />
        <Route path={process.env.REACT_APP_DEFAULT_URL + "personal-information"} element={<PersonalInfo />} />
      </Routes>
    </>
  );
}

export default Admin;
