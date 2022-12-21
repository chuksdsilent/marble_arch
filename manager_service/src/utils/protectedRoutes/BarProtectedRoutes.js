import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const BarProtectedRoutes = () => {
  const { currentUser } = useSelector(state => state.user);
  return currentUser && currentUser.data.role === "bar" ? (
    <Outlet />
  ) : (
    <Navigate to="/bar/login" />
  );
};

export default BarProtectedRoutes;
