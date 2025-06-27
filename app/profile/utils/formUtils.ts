import { WebCareer } from "../types/webCareer";
import { ProfileFormData } from "../types/profileFormData";

export const createFormFieldChangeHandler =
  (
    updateField: (
      field: keyof ProfileFormData,
      value: string | WebCareer[],
    ) => void,
  ) =>
  (field: keyof ProfileFormData, value: string | WebCareer[]) => {
    updateField(field, value);
  };
