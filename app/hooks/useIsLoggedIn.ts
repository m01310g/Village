import { useAuthStore } from "@/store/useAuthStore";

export const useIsLoggedIn = (): boolean => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return !!accessToken;
};
