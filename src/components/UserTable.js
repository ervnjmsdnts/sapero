import React, { useState } from "react";
import RolePin from "./RolePin";
import { FaUserEdit } from "react-icons/fa";
import { useUsers } from "../api/user";
import EditUserRoleModal from "./EditUserRoleModal";
import { useProfile } from "../api/profile";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const UserTable = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users } = useUsers();
  const { data: profile } = useProfile();

  if (typeof users === "string") {
    return <Spinner />;
  }

  return (
    <>
      <EditUserRoleModal
        isOpen={editOpen}
        closeModal={() => setEditOpen(false)}
        values={selectedUser}
      />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full px-6 md:px-8">
            <div className="drop-shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="flex items-center justify-between mb-6 mt-10">
                <h3 className="font-semibold text-xl">Users</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-yellow-600">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Role
                    </th>
                    <th
                      scope="col"
                      className="relative px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      <span className="sr-only">Edit Role</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white w-full divide-y divide-gray-200">
                  {users?.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm leading-5 text-gray-900">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm leading-5 text-gray-900">
                          <RolePin role={user.role}>{user.role}</RolePin>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm leading-5 text-gray-900">
                          <FaUserEdit
                            onClick={() => {
                              if (profile?._id === user._id) {
                                return toast.error(
                                  "You cannot edit your own role"
                                );
                              }
                              setSelectedUser(user);
                              setEditOpen(true);
                            }}
                            className={`text-2xl cursor-pointer ${
                              profile?._id === user._id
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-blue-400 hover:text-blue-500"
                            }`}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTable;
