import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "utils/api";

export const useStartInstance = (instanceId: string) => {
  const [isLoading, setIsLoading] = useState(false);

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

  return { startInstance, isLoading };
};
