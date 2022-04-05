import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "utils/api";

export const useStopInstance = (instanceId: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const stopInstance = () => {
    setIsLoading(true);

    api
      .post(`instance/${instanceId}/stop`)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return { stopInstance, isLoading };
};
