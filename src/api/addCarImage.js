import { useCallback, useState } from "react";
import client from "../lib/client";

const addCarImage = async (payload) => {
  const response = await client.patch("/cars/image", payload);
  return response;
};

export const useAddCarImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (payload) => {
    try {
      setIsLoading(true);
      const response = await addCarImage(payload);
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


