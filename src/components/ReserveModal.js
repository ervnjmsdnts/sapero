import dayjs from "dayjs";
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../api/profile";
import { useReserveCar } from "../api/reserveCar";
import ModalLayout from "./layout/ModalLayout";

const ReserveModal = ({ isOpen, closeModal, values }) => {
  const { execute } = useReserveCar();
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const { data: profile, mutate } = useProfile();

  const totalPrice = useMemo(() => {
    return values?.rate + 1000;
  }, [values.rate]);

  const onSubmit = useCallback(async () => {
    try {
      if (profile?.balance < totalPrice) {
        toast.error("Insufficient balance");
        return;
      }
      delete values.status;
      await execute({
        ...values,
        car: values._id,
        totalPrice,
      });
      closeModal();
      toast.success("Car reserved successfully");
      mutate("/users/current");
      navigate("/models");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, [
    execute,
    closeModal,
    values,
    totalPrice,
    navigate,
    profile.balance,
    mutate,
  ]);

  return (
    <ModalLayout isOpen={isOpen} closeModal={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="w-full">
            <p className="font-semibold">Reservation Date</p>
            <p className="">
              {dayjs(values.dateOfReservation).format("MMM DD, YYYY")}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-full">
              <p className=" font-semibold">Car</p>
              <p className="">{values.name}</p>
            </div>
            <div className="w-full">
              <p className=" font-semibold">Rate</p>
              <p className="">
                Php {values?.rate?.toLocaleString("en-US")}.00/day
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-full">
            <p className=" font-semibold">Additional Fee</p>
            <p className="">Php 1,000.00</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-full">
            <p className=" font-semibold">Total</p>
            <p className="">Php {totalPrice.toLocaleString("en-US")}.00</p>
          </div>
        </div>
        <div className="flex items-center w-full gap-2 mt-4">
          <button className="bg-yellow-600 w-full hover:bg-yellow-500 py-1 rounded-full text-white font-semibold">
            Pay
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-400 hover:bg-gray-500 w-full py-1 rounded-full text-white font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default ReserveModal;
