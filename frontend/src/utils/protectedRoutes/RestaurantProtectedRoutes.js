import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";
const RestaurantProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/manager/login" />;
};

export default RestaurantProtectedRoutes;
