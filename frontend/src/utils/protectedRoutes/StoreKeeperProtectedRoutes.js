import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";
const StoreKeeperProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/store-keeper/login" />;
};

export default StoreKeeperProtectedRoutes;
