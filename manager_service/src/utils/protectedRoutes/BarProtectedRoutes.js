import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const BarProtectedRoutes = () => {
  const { currentUser } = useSelector(state => state.user);
  return <Outlet />;
};

export default BarProtectedRoutes;
