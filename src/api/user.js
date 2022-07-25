import useSWR from "swr";

export const useUsers = () => {
  const response = useSWR("/users");
  return response;
};


