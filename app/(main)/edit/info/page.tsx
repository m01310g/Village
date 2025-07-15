"use client";

import { useEffect, useState } from "react";
import { useUserProfile } from "../../hooks/useUserProfile";
import { createFormFieldChangeHandler } from "../../utils/formUtils";
import { useInputValidation } from "../../hooks/useInputValidation";
import { useRouter } from "next/navigation";
import { useProfileFormStore } from "@/store/useProfileFormStore";
import ProfileForm from "../../create/info/components/ProfileForm";
import Button from "@/app/components/Button";
import { useIsLoggedIn } from "@/app/hooks/useIsLoggedIn";

const ProfileEditInfoPage = () => {
  const isLoggedIn = useIsLoggedIn();
  const { data: profile } = useUserProfile(isLoggedIn);
  const {
    formData,
    updateField,
    setInitialFormData,
    checkIsModified,
    resetFormData,
  } = useProfileFormStore();
  const router = useRouter();
  const nameInput = useInputValidation("name");
  const nicknameInput = useInputValidation("nickname");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const handleChange = createFormFieldChangeHandler(updateField);

  useEffect(() => {
    resetFormData();
  }, [resetFormData]);

  useEffect(() => {
    if (profile) {
      const initial = {
        profileImage: profile.profileImage || "",
        name: profile.name || "",
        nickname: profile.nickname || "",
        webCareers: profile.webCareers || [],
        introduction: profile.introduction || "",
        location: profile.location || {},
        status: profile.status || 0,
        phone: profile.phone || "",
        phoneOpened: profile.phoneOpened || 0,
      };
      setInitialFormData(initial);
    }
  }, [profile, updateField, setInitialFormData]);

  useEffect(() => {
    checkIsModified();
  }, [formData, checkIsModified]);

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
