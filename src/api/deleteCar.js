import { useCallback, useState } from "react";
import client from "../lib/client";

const deleteCar = async (payload) => {
  const response = await client.post("/cars/delete", payload);
  return response;
};

export const useDeleteCar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (payload) => {
    try {
      setIsLoading(true);
      const response = await deleteCar(payload);
      setData(response);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, data, execute };
};

