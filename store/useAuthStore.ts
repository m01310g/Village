import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  nickname: string;
  email: string;
  role: "USER";
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  resetAuth: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      resetAuth: () =>
        set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) =>
        ({
          user: state.user,
          refreshToken: state.refreshToken,
          accessToken: state.accessToken,
        }) as AuthState,
    },
  ),
);
