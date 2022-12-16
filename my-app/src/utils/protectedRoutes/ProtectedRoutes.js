import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const { currentUser } = useSelector(state => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/receptionist/login" />;
};

export default ProtectedRoutes;
