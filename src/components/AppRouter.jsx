import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Reset from "../pages/Reset";
import ResetRequest from "../pages/ResetRequest";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ToDoListPage from "../pages/ToDoListPage";

export default function AppRouter() {
  const { isAuth } = useAuth();
  console.log(isAuth);
  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="/" element={<ToDoListPage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/resetMassege" element={<ResetRequest />} />
        </>
      )}
    </Routes>
  );
}
