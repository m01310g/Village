"use client";

import Input from "@/app/components/Input";
import ProfileImageSection from "./components/ProfileImageSection";
import CareerSection from "./components/career/CareerSection";
import IntroduceSection from "./components/IntroduceSection";
import CreateButton from "./components/CreateButton";
import NameSection from "./components/NameSection";
import NicknameSection from "./components/NicknameSection";
import { useInputValidation } from "./hooks/useInputValidation";

const ProfileCreatePage = () => {
  const nameInput = useInputValidation("name");
  const nicknameInput = useInputValidation("nickname");

  const isFormValid =
    !!nameInput.value &&
    !!nicknameInput.value &&
    !nameInput.error &&
    !nicknameInput.error &&
    !nameInput.isComposing &&
    !nicknameInput.isComposing;

  return (
    <div className="flex h-full flex-col items-center">
      <form className="flex w-full max-w-[375px] flex-1 flex-col gap-8 overflow-y-auto p-4">
        <ProfileImageSection />
        <NameSection
          name={nameInput.value}
          error={nameInput.error}
          onChange={nameInput.handleChange}
          onCompositionStart={nameInput.handleCompositionStart}
          onCompositionEnd={nameInput.handleCompositionEnd}
        />
        <NicknameSection
          nickname={nicknameInput.value}
          error={nicknameInput.error}
          onChange={nicknameInput.handleChange}
          onCompositionStart={nicknameInput.handleCompositionStart}
          onCompositionEnd={nicknameInput.handleCompositionEnd}
        />
        <Input
          label="업종"
          required
          value="트레이너"
          disabled
          onChange={() => {}}
        />
        <CareerSection />
        <IntroduceSection />
      </form>

      <CreateButton isFormValid={isFormValid} />
    </div>
  );
};

export default ProfileCreatePage;
