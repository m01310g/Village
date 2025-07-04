import { create } from "zustand";

interface SearchKeywordState {
  keyword: string;
  setKeyword: (value: string) => void;
}

export const useSearchKeywordStore = create<SearchKeywordState>((set) => ({
  keyword: "",
  setKeyword: (value) => set({ keyword: value }),
}));
