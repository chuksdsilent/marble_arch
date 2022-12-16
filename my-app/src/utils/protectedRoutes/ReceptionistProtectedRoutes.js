import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";
const ReceptionistProtectedRoutes = () => {
  const { currentUser } = useSelector(state => state.user);
  return currentUser && currentUser.data.role == "receptionist" ? (
    <Outlet />
  ) : (
    <Navigate to="/receptionist/login" />
  );
};

export default ReceptionistProtectedRoutes;
