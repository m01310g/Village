import { ProfileFormData } from "@/app/profile/types/profileFormData";
import { WebCareer } from "@/app/profile/types/webCareer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileFormState {
  formData: ProfileFormData;
  updateField: (
    field: keyof ProfileFormData,
    value: string | number | WebCareer[] | { [key: string]: string[] },
  ) => void;
  setFormData: (data: ProfileFormData) => void;
}

export const useProfileFormStore = create(
  persist<ProfileFormState>(
    (set) => ({
      formData: {
        profileImage: "",
        name: "",
        nickname: "",
        webCareers: [],
        introduction: "",
        location: {},
        status: 0,
        phone: "",
        phoneOpened: 0,
      },
      updateField: (field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [field]: value,
          },
        })),
      setFormData: (data) => set({ formData: data }),
    }),
    {
      name: "profile-form-data",
    },
  ),
);
