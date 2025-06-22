"use client";

import CreateButton from "./components/CreateButton";
import { useInputValidation } from "../hooks/useInputValidation";
import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { WebCareer } from "../types/webCareer";
import { useAuthStore } from "@/store/useAuthStore";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useRouter } from "next/navigation";

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
  const accessToken = useAuthStore((state) => state.accessToken);
  const router = useRouter();

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

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/registerWebProfile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        },
      );

      if (!res.ok) {
        const error: ErrorResponse = await res.json();
        if (error.statusCode === 400) {
          throw new Error(`요청 형식 오류: ${error.message}`);
        } else if (error.statusCode === 401) {
          throw new Error(
            `유효하지 않거나 기간이 만료된 토큰: ${error.message}`,
          );
        } else if (error.statusCode === 403) {
          throw new Error(`유저 회원이 아닙니다: ${error.message}`);
        } else if (error.statusCode === 409) {
          throw new Error(`이미 등록된 프로필이 있습니다: ${error.message}`);
        } else {
          throw new Error(error.message);
        }
      }

      const result = await res.json();
      const userId = result.data.id;

      router.replace(`/profile/${userId}`);
    } catch (err: any) {
      console.error(err instanceof Error ? err.message : "알 수 없는 오류");
    }
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
