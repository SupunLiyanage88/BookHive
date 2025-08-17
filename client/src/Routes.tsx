import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router";
import Login from "./Views/loginpage";
import HomePage from "./Views/homepage";
import BookDetailPage from "./Views/bookdetail";



const AppRoutes = () => {
//   const isLogin = useAuth();
//   console.log(isLogin);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/book/:bookId" element={<BookDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;
