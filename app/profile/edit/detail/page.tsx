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
import { convertStatusToNumber } from "../../utils/formUtils";
import { useProfileFormStore } from "@/store/useProfileFormStore";
import { useProfileEdit } from "../../hooks/useProfileEdit";

const ProfileEditDetailPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: profile } = useUserProfile(isLoggedIn);
  const {
    formData,
    updateField,
    setInitialFormData,
    checkIsModified,
    isModified,
  } = useProfileFormStore();
  const router = useRouter();
  const [selectedDistricts, setSelectedDistricts] = useState<{
    [key: string]: string[];
  }>({});
  const [status, setStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isPhoneNumberOpened, setIsPhoneNumberOpened] = useState(0);
  const editProfileMutation = useProfileEdit();

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
    }
  }, [profile]);

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
  }, [profile, setInitialFormData]);

  useEffect(() => {
    checkIsModified();
  }, [formData, checkIsModified]);

  useEffect(() => {
    updateField("location", selectedDistricts);
  }, [selectedDistricts, updateField]);

  useEffect(() => {
    updateField("phoneOpened", isPhoneNumberOpened);
  }, [isPhoneNumberOpened, updateField]);

  useEffect(() => {
    updateField("phone", phoneNumber);
  }, [phoneNumber, updateField]);

  const isFormValid =
    status !== "구직 상태 선택" &&
    Object.keys(selectedDistricts).length > 0 &&
    phoneNumber !== "" &&
    phoneNumberError === "";

  useEffect(() => {
    const accessToken = useAuthStore.getState().accessToken;
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleModify = async () => {
    const payload = { ...formData };
    if (payload.profileImage === "") delete payload.profileImage;
    if (payload.introduction === "") delete payload.introduction;

    editProfileMutation.mutate(payload);
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
          setSelectedDistricts={(value) => {
            setSelectedDistricts(value);
          }}
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
          setStatus={(value) => {
            setStatus(value);
            updateField("status", convertStatusToNumber(value));
          }}
        />
        <PhoneNumberSection
          phoneNumber={phoneNumber}
          setPhoneNumber={(value: string) => {
            setPhoneNumber(value);
            updateField("phone", value);
          }}
          error={phoneNumberError}
          setError={setPhoneNumberError}
        />
        <PhoneNumberVisibilitySection
          isPhoneNumberOpened={isPhoneNumberOpened}
          setIsPhoneNumberOpened={(value: number) => {
            setIsPhoneNumberOpened(value);
            updateField("phoneOpened", value);
          }}
        />
      </form>
      <CompleteButton
        isFormValid={!!isFormValid && isModified}
        onClick={handleModify}
        onBack={() => router.back()}
      >
        수정
      </CompleteButton>
    </div>
  );
};

export default ProfileEditDetailPage;
