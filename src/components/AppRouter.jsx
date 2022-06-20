import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Boards from "../pages/Boards";
import EmailChangedSuccess from "../pages/EmailChangedSuccess";
import NotFound from "../pages/NotFound";
import PasswordChanged from "../pages/PasswordChanged";
import Reset from "../pages/Reset";
import ResetEmail from "../pages/ResetEmail";
import ResetPassword from "../pages/ResetPassword";
import ResetRequest from "../pages/ResetRequest";
import Settings from "../pages/Settings";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ToDoListPage from "../pages/ToDoListPage";
import UserDeleted from "../pages/UserDeleted";

export default function AppRouter() {
  const { isAuth } = useAuth();
  console.log(isAuth);
  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="/boards" element={<Boards />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/resetEmail" element={<ResetEmail />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route exact path="/boards/:id" element={<ToDoListPage />} />
          <Route path="" element={<Navigate to="/boards" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/resetMassege" element={<ResetRequest />} />
          <Route path="/emailChanged" element={<EmailChangedSuccess />} />
          <Route path="/passwordChanged" element={<PasswordChanged />} />
          <Route path="/userDeleted" element={<UserDeleted />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
