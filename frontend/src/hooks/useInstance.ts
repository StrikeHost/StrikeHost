import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "utils/api";

export const useInstance = (instanceId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Starts the selected instance
   */
  const startInstance = () => {
    setIsLoading(true);

    api
      .post(`instance/${instanceId}/start`)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  /**
   * Stops the selected instance
   */
  const stopInstance = () => {
    setIsLoading(true);

    api
      .post(`instance/${instanceId}/stop`)
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return { isLoading, startInstance, stopInstance };
};
