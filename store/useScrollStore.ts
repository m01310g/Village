import { create } from "zustand";

interface ScrollState {
  scrollMap: Record<string, number>;
  setScroll: (path: string, y: number) => void;
  getScroll: (path: string) => number | undefined;

  activeFilterMap: Record<string, string>;
  setActiveFilter: (path: string, filter: string) => void;
  getActiveFilter: (path: string) => string | undefined;
}

export const useScrollStore = create<ScrollState>((set, get) => ({
  scrollMap: {},
  setScroll: (path, y) =>
    set((state) => ({
      scrollMap: { ...state.scrollMap, [path]: y },
    })),
  getScroll: (path) => get().scrollMap[path],

  activeFilterMap: {},
  setActiveFilter: (path, filter) =>
    set((state) => ({
      activeFilterMap: { ...state.activeFilterMap, [path]: filter },
    })),
  getActiveFilter: (path) => get().activeFilterMap[path],
}));
