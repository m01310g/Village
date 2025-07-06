"use client";

import { useInputValidation } from "../../hooks/useInputValidation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createFormFieldChangeHandler } from "../../utils/formUtils";
import Button from "@/app/components/Button";
import { useProfileFormStore } from "@/store/useProfileFormStore";
import ProfileForm from "./components/ProfileForm";
import { useAuthStore } from "@/store/useAuthStore";
import { checkHasWebProfile } from "@/app/lib/api/checkHasProfile";

const ProfileCreateInfoPage = () => {
  const nameInput = useInputValidation("name");
  const nicknameInput = useInputValidation("nickname");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { formData, updateField } = useProfileFormStore();
  const router = useRouter();
  const { accessToken } = useAuthStore();

  const isFormValid =
    !!formData.name &&
    !!formData.nickname &&
    !nameInput.error &&
    !nicknameInput.error &&
    !nameInput.isComposing &&
    !nicknameInput.isComposing;

  const handleChange = createFormFieldChangeHandler(updateField);

  useEffect(() => {
    if (!accessToken) return;
    const checkWebProfile = async () => {
      const hasProfile = await checkHasWebProfile(accessToken);

      if (hasProfile) router.replace("/");
    };

    checkWebProfile();
  }, [accessToken, router]);

  return (
    <div className="flex h-[calc(100dvh-69px-46px-env(safe-area-inset-bottom))] flex-col items-center">
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
      <div className="sticky bottom-0 left-1/2 w-full max-w-[375px] bg-background-primary px-4 py-3">
        <Button
          size="lg"
          color="primary"
          disabled={!isFormValid}
          onClick={() => router.push("/profile/create/detail")}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default ProfileCreateInfoPage;
