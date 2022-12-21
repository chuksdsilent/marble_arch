import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";
// import Cookies from 'js-cookie';
const ProtectedRoutes = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <>
      <>
        {!currentUser ? (
          <Navigate to="/manager/login?msg=You are Logged Out" />
        ) : (
          ""
        )}
      </>
      <>
        {currentUser && currentUser.data.role === "manager" ? (
          <Outlet />
        ) : (
          <Navigate to="/manager/login?msg=Unauthorized Access" />
        )}
      </>
    </>
  );
};

export default ProtectedRoutes;
