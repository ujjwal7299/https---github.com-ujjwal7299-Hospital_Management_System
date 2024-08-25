import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const patientToken = localStorage.getItem("patientToken");

  if (!patientToken) {
    toast.error("Login to make an appointment")
  }
  return (patientToken ? <Outlet /> : <Navigate to={"/login"} />)
};

export default PrivateRoute;
