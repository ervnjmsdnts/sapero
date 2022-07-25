import useSWR from "swr";

export const useReservedCars = () => {
  const response = useSWR("/cars/me/reserved");
  return response;
};
