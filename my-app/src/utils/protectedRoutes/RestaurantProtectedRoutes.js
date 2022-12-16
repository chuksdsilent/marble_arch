import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";
const RestaurantProtectedRoutes = () => {
  const { currentUser } = useSelector(state => state.user);
  return currentUser && currentUser.data.role == "restaurant" ? (
    <Outlet />
  ) : (
    <Navigate to="/manager/login" />
  );
};

export default RestaurantProtectedRoutes;
