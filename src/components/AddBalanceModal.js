import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddBalance } from "../api/addBalance";
import { useProfile } from "../api/profile";
import Input from "./Input";
import ModalLayout from "./layout/ModalLayout";

const AddBalanceModal = ({ isOpen, closeModal }) => {
  const { data: profile, mutate } = useProfile();

  const { execute } = useAddBalance();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = useCallback(
    async (data) => {
      try {
        await execute({
          balance: Number(data.balance) + Number(profile.balance),
        });
        toast.success("Successfully added balance");
        closeModal();
        reset();
        mutate("/users/current");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    },
    [execute, closeModal, mutate, reset, profile]
  );

  return (
    <ModalLayout title="Add Balance" isOpen={isOpen} closeModal={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h6 className="font-semibold">Current Balance:</h6>
          <p>Php {profile?.balance?.toLocaleString("en-US")}.00</p>
        </div>
        <Input
          {...register("balance")}
          className="border-2"
          placeholder="Enter amount to add..."
        />
        <button className="py-1 px-4 bg-yellow-600 hover:bg-yellow-500 rounded-full text-white self-end">
          Submit
        </button>
      </form>
    </ModalLayout>
  );
};

export default AddBalanceModal;
