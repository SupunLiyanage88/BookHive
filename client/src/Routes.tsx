import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router";
import Login from "./Views/loginpage";



const AppRoutes = () => {
//   const isLogin = useAuth();
//   console.log(isLogin);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
