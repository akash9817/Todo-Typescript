import React, { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import jwt_decode from "jwt-decode";
import { getUser } from "../helper";



const PrivateRoutes = () => {
  const user = getUser()
  if(user){
    return <Outlet/>
  }else{
   return <Navigate to="/login" replace />;
  }
};
const Routes: React.FC = () => {
  return (
    <Router>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Router>
  );
};

export default Routes;
