import React from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;

  if (!isLoggedIn) {
    return <Navigate replace to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
