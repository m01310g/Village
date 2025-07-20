import ProfileLabel from "../../components/ProfileLabel";

interface IntroduceSectionProps {
  introduction: string;
  onChangeIntroduction: (value: string) => void;
}

const IntroduceSection = ({
  introduction,
  onChangeIntroduction,
}: IntroduceSectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <ProfileLabel label="자기소개" />
      <div className="flex flex-col gap-1">
        <textarea
          name="자기소개"
          id="introduce"
          className="text-body-2 h-[10.1875rem] resize-none rounded-[4px] border border-border-secondary p-3 text-text-primary outline-none placeholder:text-neutral-400"
          placeholder="자신을 소개해주세요."
          value={introduction}
          onChange={(e) => onChangeIntroduction(e.target.value)}
          maxLength={200}
        />
        <p className="text-caption-3 text-right text-neutral-400">
          {introduction.length}/200
        </p>
      </div>
    </div>
  );
};

export default IntroduceSection;
