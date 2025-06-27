import Checkbox from "@/app/components/Checkbox";
import ProfileLabel from "../../components/ProfileLabel";
import { useState } from "react";

const PhoneNumberVisibilitySection = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <section className="flex flex-col gap-3">
      <ProfileLabel label="전화번호 공개 여부" bold />
      <div className="flex h-[31px] w-full items-center gap-2">
        <Checkbox
          isChecked={isChecked}
          onClick={() => setIsChecked((prev) => !prev)}
        />
        <span className="text-caption-2 text-text-primary">
          센터에게 내 연락처를 보여줘도 괜찮아요.
        </span>
      </div>
      <span className="text-caption-3 text-text-info">
        연락처를 비공개하면 센터의 제안을 받을 수 없어요. 제안을 받으려면
        연락처를 공개해 주세요. (언제든 비공개 전환 가능)
      </span>
    </section>
  );
};

export default PhoneNumberVisibilitySection;
