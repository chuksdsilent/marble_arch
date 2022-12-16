import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";
const StoreKeeperProtectedRoutes = () => {
  const { currentUser } = useSelector(state => state.user);
  return currentUser && currentUser.data.role == "store-keeper" ? (
    <Outlet />
  ) : (
    <Navigate to="/store-keeper/login" />
  );
};

export default StoreKeeperProtectedRoutes;
