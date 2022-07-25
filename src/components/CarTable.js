import React, { useMemo, useState } from "react";
import AddCarModal from "./AddCarModal";
import StatusPin from "./StatusPin";
import { BiEdit, BiTrash } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import EditCarModal from "./EditCarModal";
import DeleteCarModal from "./DeleteCarModal";
import toast from "react-hot-toast";
import { useCars } from "../api/cars";
import Spinner from "./Spinner";
import { useAddCarImage } from "../api/addCarImage";

const CarTable = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const { data: cars, isValidating, mutate } = useCars();
  const { execute } = useAddCarImage();

  const isLoading = useMemo(() => {
    return isValidating || !cars;
  }, [isValidating, cars]);

  const handleAddImage = (e, id) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        await execute({
          image: reader.result,
          id,
        });
        toast.success("Image uploaded successfully");
        mutate("/cars");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
  };

  if (typeof cars === "string") {
    return <Spinner />;
  }

  return (
    <>
      <AddCarModal isOpen={addOpen} closeModal={() => setAddOpen(false)} />
      <EditCarModal
        isOpen={editOpen}
        closeModal={() => setEditOpen(false)}
        values={selectedCar}
      />
      <DeleteCarModal
        isOpen={deleteOpen}
        closeModal={() => setDeleteOpen(false)}
        values={selectedCar}
      />
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full px-6 md:px-8">
            <div className="drop-shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-xl">Cars</h3>
                <button
                  onClick={() => setAddOpen(true)}
                  className="font-semibold flex items-center gap-2 py-1 px-6 rounded-full bg-yellow-600 hover:bg-yellow-500">
                  <AiOutlinePlusCircle className="text-2xl" />
                  <span className="font-semibold text-lg">Add Car</span>
                </button>
              </div>
              {isLoading ? (
                <div className="text-center bg-white min-h-[20vh] flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
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
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Rate
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th
                        scope="col"
                        className="relative px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white w-full divide-y divide-gray-200">
                    {cars?.map((car) => (
                      <tr key={car._id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="text-sm leading-5 font-medium text-gray-900">
                              {car.name}
                            </div>
                            <div className="text-sm hidden md:block leading-5 text-gray-500">
                              {car.description}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm leading-5 text-gray-900">
                            {car.type}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm leading-5 text-gray-900">
                            {car.image ? (
                              <div className="flex items-center flex-col md:flex-row gap-4">
                                <img
                                  src={car.image}
                                  alt="car"
                                  className="w-40 h-28"
                                />
                                {car.status === "available" && (
                                  <div className="relative group w-32">
                                    <input
                                      type="file"
                                      onChange={(e) =>
                                        handleAddImage(e, car._id)
                                      }
                                      className="absolute file:cursor-pointer w-32 opacity-0 cursor-pointer"
                                    />
                                    <div className="flex items-center group-hover:underline gap-2">
                                      <AiOutlinePlusCircle className="text-2xl" />
                                      <span className="font-semibold">
                                        Change Image
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="relative group w-32">
                                <input
                                  type="file"
                                  onChange={(e) => handleAddImage(e, car._id)}
                                  className="absolute file:cursor-pointer w-32 opacity-0 cursor-pointer"
                                />
                                <div className="flex items-center group-hover:underline gap-2">
                                  <AiOutlinePlusCircle className="text-2xl" />
                                  <span className="font-semibold">
                                    Add Image
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm leading-5 text-gray-900">
                            Php {car.rate.toLocaleString("en-US")}.00/day
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm leading-5 text-gray-900">
                            <StatusPin status={car.status}>
                              {car.status}
                            </StatusPin>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm leading-5 text-gray-900">
                            <BiEdit
                              onClick={() => {
                                setSelectedCar(car);
                                setEditOpen(true);
                              }}
                              className="text-2xl text-blue-400 cursor-pointer hover:text-blue-500"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm leading-5 text-gray-900">
                            <BiTrash
                              onClick={() => {
                                if (car.status === "available") {
                                  setSelectedCar(car);
                                  setDeleteOpen(true);
                                } else toast.error("Cannot delete car");
                              }}
                              className={`text-gray-600 text-2xl ${
                                car.status === "available"
                                  ? "text-red-400 hover:text-red-500 cursor-pointer"
                                  : "text-gray-400 cursor-not-allowed"
                              }`}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarTable;
