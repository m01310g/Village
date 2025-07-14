import Input from "@/app/components/Input";

interface NameSectionProps {
  name: string;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompositionStart?: () => void;
  onCompositionEnd?: (e: React.CompositionEvent<HTMLInputElement>) => void;
}

const NameSection = ({
  name,
  error,
  onChange,
  onCompositionStart,
  onCompositionEnd,
}: NameSectionProps) => {
  return (
    <Input
      label={"이름"}
      value={name}
      onChange={onChange}
      required
      placeholder="실명을 입력해주세요."
      maxLength={10}
      description="내 이력과 프로필에만 표시됩니다."
      errorMessage={error!}
      onCompositionEnd={onCompositionEnd}
      onCompositionStart={onCompositionStart}
    />
  );
};

export default NameSection;
