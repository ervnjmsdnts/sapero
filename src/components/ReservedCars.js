import dayjs from "dayjs";
import React, { useMemo } from "react";
import { useReservedCars } from "../api/reservedCars";
import Spinner from "./Spinner";
import UsedPin from "./UsedPin";

const ReservedCars = () => {
  const { data: reserved, isValidating } = useReservedCars();

  const isLoading = useMemo(() => {
    return isValidating || !reserved;
  }, [isValidating, reserved]);

  if (!reserved?.length && !isLoading) {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-xl font-semibold">You have no reserved cars</h2>
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
                      Day of Reservation
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
                  {reserved?.map((reserve) => (
                    <tr key={reserve._id}>
                      <td className="px-6 py-4">
                        <div className="flex flex-col md:flex-row items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="w-12 h-8"
                              src={reserve.car.image}
                              alt={reserve.car.name}
                            />
                          </div>
                          <div className="md:ml-4 text-center md:text-left">
                            <div className="text-sm leading-5 font-medium text-gray-900">
                              {reserve.car.name}
                            </div>
                            <div className="text-sm leading-5 text-gray-500">
                              {reserve.car.type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm leading-5 text-gray-900">
                          {dayjs(reserve.dayOfReservation).format(
                            "MMM DD, YYYY"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm leading-5 text-gray-900">
                          Php {reserve.totalPrice?.toLocaleString("en-US")}.00
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm leading-5 text-gray-900">
                          <UsedPin status={reserve.status}>
                            {reserve.status}
                          </UsedPin>
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

export default ReservedCars;
