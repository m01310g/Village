import { create } from "zustand";
import { Board } from "@/app/(main)/hooks/useUserProfile";

interface CommunityStore {
  allPosts: Board[];
  setAllPosts: (posts: Board[] | ((prev: Board[]) => Board[])) => void;
  appendPosts: (posts: Board[] | ((prev: Board[]) => Board[])) => void;
  page: number;
  setPage: (page: number) => void;
  reset: () => void;
}

export const useCommunityStore = create<CommunityStore>((set) => ({
  allPosts: [],
  setAllPosts: (posts) =>
    set((state) => ({
      allPosts: typeof posts === "function" ? posts(state.allPosts) : posts,
    })),
  appendPosts: (posts) =>
    set((state) => ({
      allPosts:
        typeof posts === "function"
          ? posts(state.allPosts)
          : [...state.allPosts, ...posts],
    })),
  page: 1,
  setPage: (page) => set({ page }),
  reset: () =>
    set({
      allPosts: [],
      page: 1,
    }),
}));
