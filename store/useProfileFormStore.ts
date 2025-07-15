import { ProfileFormData } from "@/app/(main)/types/profileFormData";
import { WebCareer } from "@/app/(main)/types/webCareer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileFormState {
  formData: ProfileFormData;
  updateField: (
    field: keyof ProfileFormData,
    value: string | number | WebCareer[] | { [key: string]: string[] },
  ) => void;
  setFormData: (data: ProfileFormData) => void;
  initialFormData: ProfileFormData | null;
  setInitialFormData: (data: ProfileFormData) => void;
  isModified: boolean;
  checkIsModified: () => void;
  resetFormData: () => void;
}

export const useProfileFormStore = create(
  persist<ProfileFormState>(
    (set, get) => ({
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
      updateField: (key, value) => {
        const prevValue = get().formData[key];

        // 값이 실제로 변경된 경우에만 set 수행
        if (JSON.stringify(prevValue) !== JSON.stringify(value)) {
          set((state) => ({
            formData: {
              ...state.formData,
              [key]: value,
            },
          }));
        }
      },
      setFormData: (data) => set({ formData: data }),
      isModified: false,
      initialFormData: null,
      setInitialFormData: (data) =>
        set((state) => {
          // 이미 초기값이 설정되어 있다면 덮어쓰기 하지 않음
          if (state.initialFormData) return {};

          const newFormData = {
            ...state.formData,
            ...data,
          };

          const keysToCompare: (keyof ProfileFormData)[] = [
            "profileImage",
            "name",
            "nickname",
            "webCareers",
            "introduction",
            "location",
            "status",
            "phone",
            "phoneOpened",
          ];

          const isChanged = keysToCompare.some((key) => {
            return (
              JSON.stringify(newFormData[key]) !== JSON.stringify(data[key])
            );
          });

          return {
            initialFormData: data,
            formData: newFormData,
            isModified: isChanged,
          };
        }),
      checkIsModified: () => {
        const { formData, initialFormData } = get();
        if (!initialFormData) return;

        const isChanged =
          JSON.stringify(formData) !== JSON.stringify(initialFormData);
        set({ isModified: isChanged });
      },
      resetFormData: () => {
        set({
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
          initialFormData: null,
          isModified: false,
        });
      },
    }),
    {
      name: "profile-form-data",
    },
  ),
);
