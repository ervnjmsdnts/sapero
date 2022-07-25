import React, { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSingleCar } from "../api/singleCar";
import ModelCard from "../components/ModelCard";
import Spinner from "../components/Spinner";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/authContext";
import CustomDatePicker from "../components/CustomDatePicker";
import ReserveModal from "../components/ReserveModal";
import dayjs from "dayjs";
import toast from "react-hot-toast";

const Reserve = () => {
  const auth = useAuth();
  const { id } = useParams();
  const [dateOfReservation, setDateOfReservation] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: car, isValidating } = useSingleCar({ id });

  const isLoading = useMemo(() => {
    return isValidating || !car;
  }, [isValidating, car]);

  const isValid = useMemo(() => {
    return dayjs(dateOfReservation).isAfter(new Date());
  }, [dateOfReservation]);

  if (!auth.token) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <>
      <ReserveModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        values={{ ...car, dateOfReservation }}
      />
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-2xl font-semibold">Reserve Car</h3>
        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <ModelCard {...car} isUse />
            <div className="flex flex-col gap-2 text-gray-900">
              <div className="w-full">
                <p className="text-white font-semibold">Reservation Date</p>
                <ReactDatePicker
                  selected={dateOfReservation}
                  onChange={(date) => setDateOfReservation(date)}
                  minDate={new Date()}
                  showPopperArrow={false}
                  customInput={<CustomDatePicker />}
                />
              </div>
              <button
                onClick={() =>
                  isValid ? setIsModalOpen(true) : toast.error("Invalid date")
                }
                type="button"
                className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg">
                Reserve
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Reserve;
