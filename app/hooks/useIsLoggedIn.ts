import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

export const useIsLoggedIn = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, []);

  return isLoggedIn;
};
