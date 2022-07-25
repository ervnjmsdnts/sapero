import useSWR from "swr";

export const useSingleCar = ({ id }) => {
  const response = useSWR(`/cars/${id}`);
  return response;
};
