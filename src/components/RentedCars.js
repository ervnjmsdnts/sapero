import dayjs from "dayjs";
import React, { useMemo } from "react";
import { useRentedCars } from "../api/rentedCars";
import Spinner from "./Spinner";
import UsedPin from "./UsedPin";

const RentedCars = () => {
  const { data: rented, isValidating } = useRentedCars();

  const isLoading = useMemo(() => {
    return isValidating || !rented;
  }, [rented, isValidating]);

  if (!rented?.length && !isLoading) {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-xl font-semibold">You have no rented cars</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full px-6 md:px-8">
          <div className="drop-shadow-md overflow-hidden border-gray-200 sm:rounded-lg">
            {isLoading ? (
              <div className="text-center min-h-[20vh] flex justify-center items-center">
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
                      Pick up Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white w-full divide-y divide-gray-200">
                  {rented?.map((rent) => (
                    <tr key={rent._id}>
                      <td className="px-6 py-4">
                        <div className="flex flex-col md:flex-row items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="w-12 h-8"
                              src={rent.car.image}
                              alt={rent.car.name}
                            />
                          </div>
                          <div className="md:ml-4 text-center md:text-left">
                            <div className="text-sm leading-5 font-medium text-gray-900">
                              {rent.car.name}
                            </div>
                            <div className="text-sm leading-5 text-gray-500">
                              {rent.car.type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm leading-5 text-gray-900">
                          {dayjs(rent.pickUpDate).format("MMM DD, YYYY")}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm leading-5 text-gray-900">
                          {dayjs(rent.endDate).format("MMM DD, YYYY")}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm leading-5 text-gray-900">
                          Php {rent.totalPrice?.toLocaleString("en-US")}.00
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm leading-5 text-gray-900">
                          <UsedPin status={rent.status}>{rent.status}</UsedPin>
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
  );
};

export default RentedCars;
