import { create } from "zustand";

interface RegionFilterState {
  selectedDistricts: { [key: string]: string[] };
  setSelectedDistricts: (
    districts:
      | { [key: string]: string[] }
      | ((prev: { [key: string]: string[] }) => { [key: string]: string[] }),
  ) => void;
  resetSelectedDistricts: () => void;
}

export const useRegionFilterStore = create<RegionFilterState>((set) => ({
  selectedDistricts: {},
  setSelectedDistricts: (districts) =>
    set((state) =>
      typeof districts === "function"
        ? { selectedDistricts: districts(state.selectedDistricts) }
        : { selectedDistricts: districts },
    ),
  resetSelectedDistricts: () => set({ selectedDistricts: {} }),
}));
