import { useState } from "react";

type InputType = "name" | "nickname";

export const useInputValidation = (type: InputType) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>("");
  const [isComposing, setIsComposing] = useState(false);

  const validate = (val: string) => {
    if (type === "name") {
      if (val === "") return "이름을 입력해주세요.";
      if (val.length < 2) return "이름은 2글자 이상이어야 합니다.";
      return /^[가-힣a-zA-Z]+$/.test(val)
        ? null
        : "숫자 및 특수문자는 입력이 불가능합니다.";
    } else {
      if (val === "") return "닉네임을 입력해주세요.";
      if (val.length < 2) return "닉네임은 2글자 이상이어야 합니다.";
      const allowed = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9._-]+$/;
      const containsEmoji =
        /[\p{Emoji}]/u.test(val) || /[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(val);
      return allowed.test(val) && !containsEmoji
        ? null
        : "밑줄(_), 점(.), 하이픈(-) 외 특수문자, 이모지는 입력이 불가능합니다.";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    setError(validate(val));
  };

  const handleCompositionStart = () => setIsComposing(true);

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    const val = e.currentTarget.value;
    setIsComposing(false);
    setError(validate(val));
  };

  return {
    value,
    error,
    isComposing,
    handleChange,
    handleCompositionStart,
    handleCompositionEnd,
  };
};
