import useSWR from "swr";

export const useCars = () => {
  const response = useSWR("/cars");
  return response;
};

