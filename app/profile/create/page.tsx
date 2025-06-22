"use client";

import CreateButton from "./components/CreateButton";
import { useInputValidation } from "../hooks/useInputValidation";
import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { WebCareer } from "../types/webCareer";

const ProfileCreatePage = () => {
  const nameInput = useInputValidation("name");
  const nicknameInput = useInputValidation("nickname");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    profileImage: "",
    name: "",
    nickname: "",
    webCareers: [],
    introduction: "",
  });

  const isFormValid =
    !!nameInput.value &&
    !!nicknameInput.value &&
    !nameInput.error &&
    !nicknameInput.error &&
    !nameInput.isComposing &&
    !nicknameInput.isComposing;

  const handleChange = (
    field: keyof typeof formData,
    value: string | WebCareer[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="flex h-full flex-col items-center">
      <ProfileForm
        formData={formData}
        onChangeField={handleChange}
        name={nameInput.value}
        nickname={nicknameInput.value}
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
      <CreateButton isFormValid={isFormValid} onClick={handleSubmit} />
    </div>
  );
};

export default ProfileCreatePage;
