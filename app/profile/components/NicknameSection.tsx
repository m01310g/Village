import Input from "@/app/components/Input";

interface NicknameSectionProps {
  nickname: string;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompositionStart?: () => void;
  onCompositionEnd?: (e: React.CompositionEvent<HTMLInputElement>) => void;
}

const NicknameSection = ({
  nickname,
  error,
  onChange,
  onCompositionStart,
  onCompositionEnd,
}: NicknameSectionProps) => {
  return (
    <Input
      label={"닉네임"}
      value={nickname}
      onChange={onChange}
      required
      placeholder="닉네임을 입력해주세요"
      maxLength={15}
      description="커뮤니티 활동 시 표시됩니다."
      errorMessage={error!}
      onCompositionEnd={onCompositionEnd}
      onCompositionStart={onCompositionStart}
    />
  );
};

export default NicknameSection;
