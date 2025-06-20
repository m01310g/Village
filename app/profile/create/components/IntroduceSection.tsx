import { useState } from "react";
import ProfileLabel from "./ProfileLabel";

const IntroduceSection = () => {
  const [introduce, setIntroduece] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <ProfileLabel label="자기소개" />
      <div className="flex flex-col gap-1">
        <textarea
          name="자기소개"
          id="introduce"
          className="text-body-2 h-[163px] resize-none rounded-[4px] border border-border-secondary p-3 text-text-primary outline-none placeholder:text-neutral-400"
          placeholder="자신을 소개해주세요."
          value={introduce}
          onChange={(e) => setIntroduece(e.target.value)}
          maxLength={200}
        />
        <p className="text-caption-3 text-right text-neutral-400">
          {introduce.length}/200
        </p>
      </div>
    </div>
  );
};

export default IntroduceSection;
