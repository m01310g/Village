import Checkbox from "@/app/components/Checkbox";
import ProfileLabel from "../../components/ProfileLabel";
import InfoIcon from "@/public/icons/information-circle-contained.svg";

interface PhoneNumberVisibilitySectionProps {
  isPhoneNumberOpened: number;
  setIsPhoneNumberOpened: (value: number) => void;
}

const PhoneNumberVisibilitySection = ({
  isPhoneNumberOpened,
  setIsPhoneNumberOpened,
}: PhoneNumberVisibilitySectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <ProfileLabel label="전화번호 공개 여부" bold />
      <div className="flex h-[31px] w-full items-center gap-2">
        <Checkbox
          isChecked={isPhoneNumberOpened === 1}
          onClick={() => {
            const newValue = isPhoneNumberOpened === 1 ? 0 : 1;
            setIsPhoneNumberOpened(newValue);
          }}
        />
        <span className="text-caption-2 text-text-primary">
          센터에게 내 연락처를 보여줘도 괜찮아요.
        </span>
      </div>
      <div className="flex gap-2 rounded-[5px] bg-background-brandSecondary p-3">
        <InfoIcon />
        <span className="text-caption-3 whitespace-pre-line text-text-info">
          {`연락처를 비공개하면 센터의 제안을 받을 수 없어요.
          제안을 받고 싶다면 연락처를 공개해주세요.
          (필요할 때 언제든 비공개로 바꿀 수 있어요.)`}
        </span>
      </div>
    </section>
  );
};

export default PhoneNumberVisibilitySection;
