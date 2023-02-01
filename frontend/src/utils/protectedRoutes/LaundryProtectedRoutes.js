import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const LaundryProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/laundry/login?msg=unauthorized access" />
  );
};

export default LaundryProtectedRoutes;
