import useSWR from "swr";

export const useProfile = () => {
  const response = useSWR("/users/current");
  return response;
};
