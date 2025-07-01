import { create } from "zustand";

interface ScrollState {
  scrollMap: Record<string, number>;
  setScroll: (path: string, y: number) => void;
  getScroll: (path: string) => number | undefined;
}

export const useScrollStore = create<ScrollState>((set, get) => ({
  scrollMap: {},
  setScroll: (path, y) =>
    set((state) => ({
      scrollMap: { ...state.scrollMap, [path]: y },
    })),
  getScroll: (path) => get().scrollMap[path],
}));
