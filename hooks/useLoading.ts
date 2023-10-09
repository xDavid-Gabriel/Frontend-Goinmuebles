import { useCallback, useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return { isLoading, startLoading, endLoading };
};
