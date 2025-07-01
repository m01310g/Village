import { create } from "zustand";

interface RegionFilterState {
  selectedDistricts: { [key: string]: string[] };
  setSelectedDistricts: (districts: { [key: string]: string[] }) => void;
  resetSelectedDistricts: () => void;
}

export const useRegionFilterStore = create<RegionFilterState>((set) => ({
  selectedDistricts: {},
  setSelectedDistricts: (districts) => set({ selectedDistricts: districts }),
  resetSelectedDistricts: () => set({ selectedDistricts: {} }),
}));
