import { create } from "zustand";

interface User {
  id: number;
  nickname: string;
  email: string;
  role: "USER";
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
  resetAuth: () => set({ user: null, accessToken: null }),
}));
