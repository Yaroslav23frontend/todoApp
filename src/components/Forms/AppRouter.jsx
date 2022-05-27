import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Reset from "../../pages/Reset";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import ToDoListPage from "../../pages/ToDoListPage";

export default function AppRouter() {
  const { isAuth } = useAuth();
  console.log(isAuth);
  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="/todoApp" element={<ToDoListPage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<Reset />} />
        </>
      )}
    </Routes>
  );
}
