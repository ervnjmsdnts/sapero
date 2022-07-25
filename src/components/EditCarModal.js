import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCars } from "../api/cars";
import { useUpdateCar } from "../api/updateCar";
import Input from "./Input";
import ModalLayout from "./layout/ModalLayout";
import Select from "./Select";

const statusOptions = [
  { value: "available", label: "Available" },
  { value: "rented", label: "Rented" },
  { value: "reserved", label: "Reserved" },
];

const EditCarModal = ({ isOpen, closeModal, values }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);

  const { setValue, register, handleSubmit } = useForm();

  const { mutate } = useCars();

  const { execute } = useUpdateCar();

  const onSubmit = useCallback(
    async (data) => {
      try {
        await execute({
          ...data,
          id: values._id,
          status: selectedStatus.value,
        });
        toast.success("Successfully updated car");
        closeModal();
        mutate("/cars");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    },
    [execute, closeModal, values, selectedStatus, mutate]
  );

  useEffect(() => {
    if (values) {
      setSelectedStatus(
        statusOptions.find((status) => status.value === values.status)
      );
      setValue("name", values.name);
      setValue("type", values.type);
      setValue("description", values.description);
      setValue("rate", values.rate);
    }
  }, [setValue, values]);

  const isNotStatusAvailable = useMemo(() => {
    return values && values.status !== "available";
  }, [values]);

  return (
    <ModalLayout isOpen={isOpen} closeModal={closeModal} title="Edit Car">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Input
            {...register("name")}
            disabled={isNotStatusAvailable}
            className="border-2"
            label="Name"
            placeholder="Enter car name..."
          />
          <Input
            {...register("type")}
            disabled={isNotStatusAvailable}
            className="border-2"
            label="Type"
            placeholder="Enter car type..."
          />
          <Input
            {...register("description")}
            disabled={isNotStatusAvailable}
            className="border-2"
            label="Description"
            placeholder="Enter car description..."
          />
          <Input
            {...register("rate")}
            disabled={isNotStatusAvailable}
            className="border-2"
            label="Rate"
            placeholder="Enter car rate..."
          />
          <Select
            label="Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
          />
          <button className="py-1 px-4 bg-yellow-600 hover:bg-yellow-500 rounded-full self-end text-white font-semibold mt-4">
            Save
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditCarModal;
