import { useAuthStore } from "@/store/useAuthStore";

export const useIsLoggedIn = (): {
  isLoggedIn: boolean;
  hasHydrated: boolean;
} => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  return {
    isLoggedIn: !!accessToken,
    hasHydrated: !!hasHydrated,
  };
};
