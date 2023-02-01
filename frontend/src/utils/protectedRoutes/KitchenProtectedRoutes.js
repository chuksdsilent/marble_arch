import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const KitchenProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/kitchen/login?msg=unauthorized access" />
  );
};

export default KitchenProtectedRoutes;
