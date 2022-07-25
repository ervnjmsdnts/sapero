import React, { useCallback } from "react";
import { Navigate } from "react-router-dom";
import RentedCars from "../components/RentedCars";
import ReservedCars from "../components/ReservedCars";
import { useAuth } from "../context/authContext";

const MyCars = () => {
  const [isRenting, setIsRenting] = React.useState(true);

  const auth = useAuth();

  const handleRent = useCallback(() => {
    setIsRenting(true);
  }, [setIsRenting]);

  const handleReserve = useCallback(() => {
    setIsRenting(false);
  }, [setIsRenting]);

  if (!auth.token) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h3 className="text-2xl font-bold text-white">My Cars</h3>
      <div className="flex gap-4 items-center">
        <button
          className={`${isRenting ? "text-yellow-600 underline" : ""}`}
          onClick={handleRent}>
          Rented Cars
        </button>
        <div className="w-px bg-white h-8"></div>
        <button
          className={`${!isRenting ? "text-yellow-600 underline" : ""}`}
          onClick={handleReserve}>
          Reserved Cars
        </button>
      </div>
      {isRenting ? <RentedCars /> : <ReservedCars />}
    </div>
  );
};

export default MyCars;
