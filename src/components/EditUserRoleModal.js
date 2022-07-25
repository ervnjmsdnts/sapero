import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateUserRole } from "../api/updateUserRole";
import { useUsers } from "../api/user";
import ModalLayout from "./layout/ModalLayout";
import Select from "./Select";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

const EditUserRoleModal = ({ isOpen, closeModal, values }) => {
  const [selectedRole, setSelectedRole] = React.useState(null);

  const { handleSubmit } = useForm();

  const { execute } = useUpdateUserRole();

  const { mutate } = useUsers();

  const onSubmit = useCallback(async () => {
    try {
      await execute({
        id: values._id,
        role: selectedRole.value,
      });
      toast.success("Successfully updated user");
      closeModal();
      mutate("/users");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, [execute, closeModal, values, selectedRole, mutate]);

  useEffect(() => {
    if (values) {
      setSelectedRole(roleOptions.find((role) => role.value === values.role));
    }
  }, [values]);

  return (
    <ModalLayout isOpen={isOpen} closeModal={closeModal} title="Edit User Role">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Select
            optionsStyle="-bottom-20"
            options={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
          />
          <button
            type="submit"
            className="py-1 px-4 bg-yellow-600 hover:bg-yellow-500 rounded-full self-end text-white font-semibold mt-4">
            Save
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditUserRoleModal;
