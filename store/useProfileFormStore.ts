import { ProfileFormData } from "@/app/profile/types/profileFormData";
import { WebCareer } from "@/app/profile/types/webCareer";
import { create } from "zustand";

interface ProfileFormState {
  formData: ProfileFormData;
  updateField: (
    field: keyof ProfileFormData,
    value: string | WebCareer[],
  ) => void;
  setFormData: (data: ProfileFormData) => void;
}

export const useProfileFormStore = create<ProfileFormState>((set) => ({
  formData: {
    profileImage: "",
    name: "",
    nickname: "",
    webCareers: [],
    introduction: "",
  },
  updateField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
  setFormData: (data) => set({ formData: data }),
}));
