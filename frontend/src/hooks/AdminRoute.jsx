import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (userInfo.role !== "admin") {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};
