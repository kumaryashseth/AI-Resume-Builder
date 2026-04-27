import React from "react";
import { isLoggedIn } from "../services/Auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;