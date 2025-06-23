"use client";

import { useEffect, useState } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import ProfileForm from "../components/ProfileForm";
import { ProfileFormData } from "../types/profileFormData";
import { createFormFieldChangeHandler } from "../utils/formUtils";
import { useInputValidation } from "../hooks/useInputValidation";
import CompleteButton from "../components/CompleteButton";

const ProfileEditPage = () => {
  const { data: profile, isLoading, error } = useUserProfile();
  const [formData, setFormData] = useState<ProfileFormData>({
    profileImage: "",
    name: "",
    nickname: "",
    webCareers: [],
    introduction: "",
  });

  const nameInput = useInputValidation("name");
  const nicknameInput = useInputValidation("nickname");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        profileImage: profile.profileImage || "",
        name: profile.name || "",
        nickname: profile.nickname || "",
        webCareers: profile.webCareers || [],
        introduction: profile.introduction || "",
      });
    }
  }, [profile]);

  const isFormValid =
    !!nameInput.value &&
    !!nicknameInput.value &&
    !nameInput.error &&
    !nicknameInput.error &&
    !nameInput.isComposing &&
    !nicknameInput.isComposing;

  const handleChange = createFormFieldChangeHandler(setFormData);

  const handleSubmit = () => {
    console.log(formData);
  };

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
      />
      <CompleteButton isFormValid={isFormValid} onClick={handleSubmit}>
        수정 완료
      </CompleteButton>
    </div>
  );
};

export default ProfileEditPage;
