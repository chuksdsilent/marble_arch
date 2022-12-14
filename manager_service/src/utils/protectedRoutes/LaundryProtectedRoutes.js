import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const LaundryProtectedRoutes = () => {
  const { currentUser } = useSelector(state => state.user);
  return currentUser && currentUser.data.role == "laundry" ? (
    <Outlet />
  ) : (
    <Navigate to="/laundry/login?msg=unauthorized access" />
  );
};

export default LaundryProtectedRoutes;
