import { Dispatch, SetStateAction } from "react";
import Input from "@/app/components/Input";
import ProfileLabel from "../../components/ProfileLabel";

interface PhoneNumberSectionProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

const PhoneNumberSection = ({
  phoneNumber,
  setPhoneNumber,
  error,
  setError,
}: PhoneNumberSectionProps) => {
  const formatPhoneNumber = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 11);
    if (numbersOnly.length < 10) {
      return numbersOnly;
    }
    if (numbersOnly.length <= 10) {
      return numbersOnly.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    }
    return numbersOnly.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatPhoneNumber(rawValue);
    setPhoneNumber(formatted);

    if (formatted.replace(/\D/g, "").length < 10) {
      setError("010-0000-0000 형식에 맞지 않습니다.");
    } else {
      setError("");
    }
  };

  return (
    <section className="flex flex-col gap-3">
      <ProfileLabel label="전화번호" required bold />
      <Input
        placeholder="`-`없이 숫자만 입력해주세요"
        onChange={handleChange}
        value={phoneNumber}
        errorMessage={error}
      />
    </section>
  );
};

export default PhoneNumberSection;
