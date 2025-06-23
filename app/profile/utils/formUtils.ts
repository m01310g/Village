import { Dispatch, SetStateAction } from "react";
import { WebCareer } from "../types/webCareer";
import { ProfileFormData } from "../types/profileFormData";

export const createFormFieldChangeHandler =
  (setFormData: Dispatch<SetStateAction<ProfileFormData>>) =>
  (field: keyof ProfileFormData, value: string | WebCareer[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
