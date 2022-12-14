import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const KitchenProtectedRoutes = () => {
  const { currentUser } = useSelector(state => state.user);
  return currentUser && currentUser.data.role == "kitchen" ? (
    <Outlet />
  ) : (
    <Navigate to="/kitchen/login?msg=unauthorized access" />
  );
};

export default KitchenProtectedRoutes;
