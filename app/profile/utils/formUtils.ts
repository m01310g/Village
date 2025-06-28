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

export const convertStatusToNumber = (statusStr: string): number => {
  switch (statusStr) {
    case "구직 중이에요":
      return 0;
    case "일하고 있지만 좋은 제안은 검토해볼게요":
      return 1;
    case "당장은 구직 또는 이직 생각이 없어요":
      return 2;
    case "특정 요일/시간만 일할 수 있어요":
      return 3;
    default:
      return -1;
  }
};
