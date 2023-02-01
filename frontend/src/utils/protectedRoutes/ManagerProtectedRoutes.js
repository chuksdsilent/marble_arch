import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";
// import Cookies from 'js-cookie';
const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <>
        {!token ? <Navigate to="/manager/login?msg=You are Logged Out" /> : ""}
      </>
      <>
        {token ? (
          <Outlet />
        ) : (
          <Navigate to="/manager/login?msg=Unauthorized Access" />
        )}
      </>
    </>
  );
};

export default ProtectedRoutes;
