import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import CarTable from "../components/CarTable";
import UserTable from "../components/UserTable";

const Admin = () => {
  const auth = useAuth();

  if (auth.userRole !== "admin") {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="py-12">
        <CarTable />
        <UserTable />
      </div>
    </>
  );
};

export default Admin;
