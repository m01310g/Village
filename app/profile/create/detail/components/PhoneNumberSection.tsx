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

    const part1 = numbersOnly.slice(0, 3);
    const part2 = numbersOnly.slice(3, 7);
    const part3 = numbersOnly.slice(7, 11);

    if (numbersOnly.length <= 3) {
      return part1;
    } else if (numbersOnly.length <= 7) {
      return `${part1}-${part2}`;
    } else {
      return `${part1}-${part2}-${part3}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatPhoneNumber(rawValue);
    setPhoneNumber(formatted);

    if (formatted.replace(/\D/g, "").length < 11) {
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
