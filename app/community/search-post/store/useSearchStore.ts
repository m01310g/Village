import { create } from "zustand";
import { Board } from "@/app/(main)/hooks/useUserProfile";

interface SearchStore {
  allSearchedPosts: Board[];
  setAllSearchedPosts: (posts: Board[]) => void;
  appendSearchedPosts: (posts: Board[] | ((prev: Board[]) => Board[])) => void;
  searchPage: number;
  setSearchPage: (page: number) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  allSearchedPosts: [],
  setAllSearchedPosts: (posts) => set({ allSearchedPosts: posts }),
  appendSearchedPosts: (posts) =>
    set((state) => ({
      allSearchedPosts:
        typeof posts === "function"
          ? posts(state.allSearchedPosts)
          : [...state.allSearchedPosts, ...posts],
    })),
  searchPage: 1,
  setSearchPage: (page) => set({ searchPage: page }),
  reset: () =>
    set({
      allSearchedPosts: [],
      searchPage: 1,
    }),
}));
