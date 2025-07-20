"use client";

import { useInputValidation } from "../../hooks/useInputValidation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFormFieldChangeHandler } from "../../utils/formUtils";
import Button from "@/app/components/Button";
import { useProfileFormStore } from "@/store/useProfileFormStore";
import ProfileForm from "./components/ProfileForm";

const ProfileCreateInfoPage = () => {
  const nameInput = useInputValidation("name");
  const nicknameInput = useInputValidation("nickname");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { formData, updateField } = useProfileFormStore();
  const router = useRouter();

  const isFormValid =
    !!formData.name &&
    !!formData.nickname &&
    !nameInput.error &&
    !nicknameInput.error &&
    !nameInput.isComposing &&
    !nicknameInput.isComposing;

  const handleChange = createFormFieldChangeHandler(updateField);

  return (
    <div className="flex h-full flex-col items-center">
      <ProfileForm
        formData={formData}
        onChangeField={handleChange}
        name={formData.name}
        nickname={formData.nickname}
        nameError={nameInput.error}
        nicknameError={nicknameInput.error}
        onChangeName={(e) => {
          nameInput.handleChange(e);
          updateField("name", e.target.value);
        }}
        onChangeNickname={(e) => {
          nicknameInput.handleChange(e);
          updateField("nickname", e.target.value);
        }}
        onCompositionStartName={nameInput.handleCompositionStart}
        onCompositionEndName={nameInput.handleCompositionEnd}
        onCompositionStartNickname={nicknameInput.handleCompositionStart}
        onCompositionEndNickname={nicknameInput.handleCompositionEnd}
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        initialImage={formData.profileImage || ""}
      />
      <div className="sticky bottom-0 left-1/2 w-full max-w-[500px] bg-background-primary px-4 py-3">
        <Button
          size="lg"
          color="primary"
          disabled={!isFormValid}
          onClick={() => router.push("/create/detail")}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default ProfileCreateInfoPage;
