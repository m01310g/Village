"use client";

import { useEffect, useState } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { ProfileFormData } from "../types/profileFormData";
import { createFormFieldChangeHandler } from "../utils/formUtils";
import { useInputValidation } from "../hooks/useInputValidation";
import CompleteButton from "../create/detail/components/CompleteButton";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { useProfileFormStore } from "@/store/useProfileFormStore";
import ProfileForm from "../create/info/components/ProfileForm";
import { useAuthStore } from "@/store/useAuthStore";

const ProfileEditPage = () => {
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
  });

  useEffect(() => {
    if (profile) {
      updateField("profileImage", profile.profileImage || "");
      updateField("name", profile.name || "");
      updateField("nickname", profile.nickname || "");
      updateField("webCareers", profile.webCareers || []);
      updateField("introduction", profile.introduction || "");
    }
  }, [profile]);

  const isFormChanged =
    profile &&
    (profile.name !== formData.name ||
      profile.nickname !== formData.nickname ||
      profile.profileImage !== formData.profileImage ||
      profile.introduction !== formData.introduction ||
      JSON.stringify(profile.webCareers) !==
        JSON.stringify(formData.webCareers));

  const handleChange = createFormFieldChangeHandler(updateField);

  const handleModify = async () => {
    try {
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/modifyWebProfile`,
        {
          headers: {
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
        } else if (error.statusCode === 404) {
          throw new Error(`등록된 프로필 없음: ${error.message}`);
        } else {
          throw new Error(error.message);
        }
      }

      router.push("/profile");
    } catch (err: any) {
      console.error(
        err instanceof Error ? err.message : "프로필 수정 중 오류 발생",
      );
    }
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
        initialImage={profile?.profileImage}
      />
      <CompleteButton isFormValid={!!isFormChanged} onClick={handleModify}>
        수정 완료
      </CompleteButton>
    </div>
  );
};

export default ProfileEditPage;
