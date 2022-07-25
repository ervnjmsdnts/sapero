import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { useCars } from "../api/cars";
import { useDeleteCar } from "../api/deleteCar";
import ModalLayout from "./layout/ModalLayout";

const DeleteCarModal = ({ isOpen, closeModal, values }) => {
  const { execute } = useDeleteCar();

  const { mutate } = useCars();

  const onClick = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await execute({ id: values._id });
        toast.success("Successfully deleted car");
        closeModal();
        mutate("/cars");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    },
    [execute, closeModal, values, mutate]
  );

  return (
    <ModalLayout title="DeleteModal" isOpen={isOpen} closeModal={closeModal}>
      <div className="flex items-center justify-center flex-col">
        <p className="text-center text-gray-600 text-sm">
          Are you sure you want to delete this car?
        </p>
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={(e) => onClick(e)}
            type="submit"
            className="py-1 px-4 bg-yellow-600 hover:bg-yellow-500 rounded-full self-end text-white font-semibold">
            Yes
          </button>
          <button
            onClick={closeModal}
            className="py-1 px-4 bg-gray-600 hover:bg-gray-500 rounded-full self-end text-white font-semibold ml-4">
            No
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default DeleteCarModal;
