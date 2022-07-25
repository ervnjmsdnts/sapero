import React, { useCallback } from "react";
import ModalLayout from "./layout/ModalLayout";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useAddCar } from "../api/addCar";
import toast from "react-hot-toast";
import { useCars } from "../api/cars";

const AddCarModal = ({ isOpen, closeModal }) => {
  const { register, handleSubmit } = useForm();

  const { execute } = useAddCar();

  const { mutate } = useCars();

  const onSubmit = useCallback(
    async (data) => {
      try {
        await execute(data);
        toast.success("Successfully added car");
        closeModal();
        mutate("/cars");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    },
    [execute, closeModal, mutate]
  );

  return (
    <ModalLayout isOpen={isOpen} closeModal={closeModal} title="Add Car">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Input
            {...register("name")}
            className="border-2"
            label="Name"
            placeholder="Enter car name..."
          />
          <Input
            {...register("type")}
            className="border-2"
            label="Type"
            placeholder="Enter car type..."
          />
          <Input
            {...register("description")}
            className="border-2"
            label="Description"
            placeholder="Enter car description..."
          />
          <Input
            {...register("rate")}
            className="border-2"
            label="Rate"
            placeholder="Enter car rate..."
          />
          <button className="py-1 px-4 bg-yellow-600 hover:bg-yellow-500 rounded-full self-end text-white font-semibold mt-4">
            Submit
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddCarModal;
