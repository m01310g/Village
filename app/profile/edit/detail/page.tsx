"use client";

import { useEffect, useState } from "react";
import CompleteButton from "../../create/detail/components/CompleteButton";
import JobSeekingStatusSection from "../../create/detail/components/JobSeekingStatusSection";
import PhoneNumberSection from "../../create/detail/components/PhoneNumberSection";
import PhoneNumberVisibilitySection from "../../create/detail/components/PhoneNumberVisibilitySeciton";
import WorkRegionSection from "../../create/detail/components/WorkRegionSection";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { convertStatusToNumber } from "../../utils/formUtils";
import { useProfileFormStore } from "@/store/useProfileFormStore";

const ProfileEditDetailPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: profile } = useUserProfile(isLoggedIn);
  const { formData, updateField } = useProfileFormStore();
  const router = useRouter();
  const [selectedDistricts, setSelectedDistricts] = useState<{
    [key: string]: string[];
  }>({});
  const [status, setStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isPhoneNumberOpened, setIsPhoneNumberOpened] = useState(0);

  useEffect(() => {
    if (profile) {
      const formattedLocation =
        Array.isArray(profile.location) && profile.location.length > 0
          ? Object.assign({}, ...profile.location)
          : profile.location || {};

      setSelectedDistricts(formattedLocation);
      setStatus(
        profile.status === 0
          ? "구직 중이에요"
          : profile.status === 1
            ? "일하고 있지만 좋은 제안은 검토해볼게요"
            : profile.status === 2
              ? "당장은 구직 또는 이직 생각이 없어요"
              : "특정 요일/시간만 일할 수 있어요",
      );
      setPhoneNumber(profile.phone || "");
      setIsPhoneNumberOpened(profile.phoneOpened || 0);

      updateField("location", formattedLocation);
      updateField("status", convertStatusToNumber(status));
      updateField("phone", profile.phone || "");
      updateField("phoneOpened", profile.phoneOpened || 0);
    }
  }, [profile, status, updateField, formData]);

  const isFormValid =
    status !== "구직 상태 선택" &&
    Object.keys(selectedDistricts).length > 0 &&
    phoneNumber !== "" &&
    phoneNumberError === "";

  const isFormChanged =
    profile &&
    (profile.status !== convertStatusToNumber(status) ||
      JSON.stringify(profile.location) !== JSON.stringify(selectedDistricts) ||
      profile.phone !== phoneNumber);

  useEffect(() => {
    const accessToken = useAuthStore.getState().accessToken;
    setIsLoggedIn(!!accessToken);
  }, []);

  useEffect(() => {
    updateField("phoneOpened", isPhoneNumberOpened);
  }, [isPhoneNumberOpened, updateField]);

  const handleModify = async () => {
    console.log(formData);
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
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : "프로필 수정 중 오류 발생",
      );
    }
  };

  return (
    <div className="flex h-full flex-col items-center">
      <form className="flex w-full max-w-[375px] flex-col gap-8 overflow-y-auto p-4">
        <div className="text-caption-2 rounded-[5px] bg-neutral-50 p-3 text-neutral-900">
          해당 정보는 채용 담당자에게만 공개되며, 현재 근무 중인 센터의
          담당자에게는 공개되지 않습니다.
        </div>
        <WorkRegionSection
          selectedDistricts={selectedDistricts}
          setSelectedDistricts={setSelectedDistricts}
        />
        <JobSeekingStatusSection
          status={
            formData.status === 0
              ? "구직 중이에요"
              : formData.status === 1
                ? "일하고 있지만 좋은 제안은 검토해볼게요"
                : formData.status === 2
                  ? "당장은 구직 또는 이직 생각이 없어요"
                  : "특정 요일/시간만 일할 수 있어요"
          }
          setStatus={setStatus}
        />
        <PhoneNumberSection
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          error={phoneNumberError}
          setError={setPhoneNumberError}
        />
        <PhoneNumberVisibilitySection
          isPhoneNumberOpened={formData.phoneOpened}
          setIsPhoneNumberOpened={setIsPhoneNumberOpened}
        />
      </form>
      <CompleteButton
        isFormValid={!!isFormValid && !!isFormChanged}
        onClick={handleModify}
      >
        수정
      </CompleteButton>
    </div>
  );
};

export default ProfileEditDetailPage;
