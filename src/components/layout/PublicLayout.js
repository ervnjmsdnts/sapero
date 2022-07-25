import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

const PublicLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children ? children : <Outlet />}</main>
    </>
  );
};

export default PublicLayout;
