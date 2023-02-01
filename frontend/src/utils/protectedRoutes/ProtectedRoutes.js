import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/receptionist/login" />;
};

export default ProtectedRoutes;
