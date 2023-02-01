import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const BarProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/bar/login" />;
};

export default BarProtectedRoutes;
