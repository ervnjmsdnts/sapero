import { useCallback, useState } from "react";
import client from "../lib/client";

const addCar = async (payload) => {
  const response = await client.post("/cars/create", payload);
  return response;
};

export const useAddCar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (payload) => {
    try {
      setIsLoading(true);
      const response = await addCar(payload);
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

