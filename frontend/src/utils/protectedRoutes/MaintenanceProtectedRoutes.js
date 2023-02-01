import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const MaintenanceProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/maintenance/login?msg=unauthorized access" />
  );
};

export default MaintenanceProtectedRoutes;
