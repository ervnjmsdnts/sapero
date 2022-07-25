import useSWR from "swr";

export const useRentedCars = () => {
  const response = useSWR("/cars/me/rented");
  return response;
};
