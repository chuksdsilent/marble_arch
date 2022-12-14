import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const MaintenanceProtectedRoutes = () => {
  const { currentUser } = useSelector(state => state.user);
  return currentUser && currentUser.data.role == "maintenance" ? (
    <Outlet />
  ) : (
    <Navigate to="/maintenance/login?msg=unauthorized access" />
  );
};

export default MaintenanceProtectedRoutes;
