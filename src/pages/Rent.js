import React, { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSingleCar } from "../api/singleCar";
import ModelCard from "../components/ModelCard";
import Spinner from "../components/Spinner";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RentModal from "../components/RentModal";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import CustomDatePicker from "../components/CustomDatePicker";

const Rent = () => {
  const auth = useAuth();
  const { id } = useParams();
  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: car, isValidating } = useSingleCar({ id });

  const isLoading = useMemo(() => {
    return isValidating || !car;
  }, [isValidating, car]);

  const isNotValid = useMemo(() => {
    return (
      dayjs(pickUpDate).isAfter(endDate) || dayjs(pickUpDate).isSame(endDate)
    );
  }, [pickUpDate, endDate]);

  if (!auth.token) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <>
      <RentModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        values={{ ...car, pickUpDate, endDate }}
      />
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-2xl font-semibold">Rent Car</h3>
        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <ModelCard {...car} isUse />
            <div className="flex flex-col gap-2 text-gray-900">
              <div className="flex gap-2 items-center justify-between">
                <div className="w-full">
                  <p className="text-white font-semibold">Pickup Date</p>
                  <ReactDatePicker
                    showPopperArrow={false}
                    selected={pickUpDate}
                    onChange={(date) => setPickUpDate(date)}
                    selectsStart
                    startDate={pickUpDate}
                    minDate={pickUpDate}
                    endDate={endDate}
                    customInput={<CustomDatePicker />}
                  />
                </div>
                <div className="w-full">
                  <p className="text-white font-semibold">End Date</p>
                  <ReactDatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={pickUpDate}
                    endDate={endDate}
                    minDate={pickUpDate}
                    showPopperArrow={false}
                    customInput={<CustomDatePicker />}
                  />
                </div>
              </div>
              <button
                onClick={() =>
                  isNotValid
                    ? toast.error("Invalid dates")
                    : setIsModalOpen(true)
                }
                type="button"
                className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg">
                Rent
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Rent;
