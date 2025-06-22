"use client";

import CreateButton from "./components/CreateButton";
import { useInputValidation } from "../hooks/useInputValidation";
import { useState } from "react";
import ProfileForm from "../components/ProfileForm";

const ProfileCreatePage = () => {
  const nameInput = useInputValidation("name");
  const nicknameInput = useInputValidation("nickname");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const isFormValid =
    !!nameInput.value &&
    !!nicknameInput.value &&
    !nameInput.error &&
    !nicknameInput.error &&
    !nameInput.isComposing &&
    !nicknameInput.isComposing;

  return (
    <div className="flex h-full flex-col items-center">
      <ProfileForm
        name={nameInput.value}
        nickname={nicknameInput.value}
        nameError={nameInput.error}
        nicknameError={nicknameInput.error}
        onChangeName={nameInput.handleChange}
        onChangeNickname={nicknameInput.handleChange}
        onCompositionStartName={nameInput.handleCompositionStart}
        onCompositionEndName={nameInput.handleCompositionEnd}
        onCompositionStartNickname={nicknameInput.handleCompositionStart}
        onCompositionEndNickname={nicknameInput.handleCompositionEnd}
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
      />
      <CreateButton isFormValid={isFormValid} />
    </div>
  );
};

export default ProfileCreatePage;
