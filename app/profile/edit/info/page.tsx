"use client";

import { useEffect, useState } from "react";
import { useUserProfile } from "../../hooks/useUserProfile";
import { createFormFieldChangeHandler } from "../../utils/formUtils";
import { useInputValidation } from "../../hooks/useInputValidation";
import { useRouter } from "next/navigation";
import { useProfileFormStore } from "@/store/useProfileFormStore";
import ProfileForm from "../../create/info/components/ProfileForm";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "@/app/components/Button";

const ProfileEditInfoPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: profile, isLoading, error } = useUserProfile(isLoggedIn);
  const { formData, updateField } = useProfileFormStore();
  const router = useRouter();
  const nameInput = useInputValidation("name");
  const nicknameInput = useInputValidation("nickname");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  useEffect(() => {
    const accessToken = useAuthStore.getState().accessToken;
    setIsLoggedIn(!!accessToken);
  }, []);

  useEffect(() => {
    if (profile) {
      updateField("profileImage", profile.profileImage || "");
      updateField("name", profile.name || "");
      updateField("nickname", profile.nickname || "");
      updateField("webCareers", profile.webCareers || []);
      updateField("introduction", profile.introduction || "");
    }
  }, [profile]);

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
          handleChange("name", e.target.value);
        }}
        onChangeNickname={(e) => {
          nicknameInput.handleChange(e);
          handleChange("nickname", e.target.value);
        }}
        onCompositionStartName={nameInput.handleCompositionStart}
        onCompositionEndName={nameInput.handleCompositionEnd}
        onCompositionStartNickname={nicknameInput.handleCompositionStart}
        onCompositionEndNickname={nicknameInput.handleCompositionEnd}
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        initialImage={profile?.profileImage}
      />
      <div className="sticky bottom-0 left-1/2 w-full max-w-[375px] bg-background-primary px-4 py-3">
        <Button
          size="lg"
          color="primary"
          onClick={() => router.push("/profile/edit/detail")}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditInfoPage;
