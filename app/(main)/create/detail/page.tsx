"use client";

import { useRouter } from "next/navigation";
import CompleteButton from "./components/CompleteButton";
import { useProfileFormStore } from "@/store/useProfileFormStore";
import WorkRegionSection from "./components/WorkRegionSection";
import JobSeekingStatusSection from "./components/JobSeekingStatusSection";
import { useEffect, useState } from "react";
import PhoneNumberSection from "./components/PhoneNumberSection";
import PhoneNumberVisibilitySection from "./components/PhoneNumberVisibilitySeciton";
import { convertStatusToNumber } from "../../utils/formUtils";
import { useCreateProfile } from "../../hooks/useProfileCreate";
import { toast } from "react-hot-toast";

const ProfileCreateDetailPage = () => {
  const router = useRouter();
  const { formData, updateField } = useProfileFormStore();
  const [status, setStatus] = useState("구직 상태 선택");
  const [selectedDistricts, setSelectedDistricts] = useState<{
    [key: string]: string[];
  }>({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isPhoneNumberOpened, setIsPhoneNumberOpened] = useState(0);
  const createProfileMutation = useCreateProfile();

  const isFormValid =
    status !== "구직 상태 선택" &&
    Object.keys(selectedDistricts).length > 0 &&
    phoneNumber !== "" &&
    phoneNumberError === "";

  useEffect(() => {
    if (status !== "구직 상태 선택") {
      updateField("status", convertStatusToNumber(status));
    }
  }, [status, updateField]);

  useEffect(() => {
    if (Object.keys(selectedDistricts).length > 0) {
      updateField("location", selectedDistricts);
    }
  }, [selectedDistricts, updateField]);

  useEffect(() => {
    if (phoneNumber !== "") {
      updateField("phone", phoneNumber);
    }
  }, [phoneNumber, updateField]);

  useEffect(() => {
    updateField("phoneOpened", isPhoneNumberOpened);
  }, [isPhoneNumberOpened, updateField]);

  const handleSubmit = async () => {
    if (formData.status !== 2 && formData.phoneOpened === 0) {
      toast.error("전화번호 공개 여부에 체크해주세요.");
      return;
    }

    const payload = { ...formData };
    if (payload.profileImage === "") delete payload.profileImage;
    if (payload.introduction === "") delete payload.introduction;

    createProfileMutation.mutate(payload);
  };

  return (
    <div className="flex h-[calc(100dvh-46px-env(safe-area-inset-bottom))] flex-col items-center">
      <form className="flex w-full max-w-[500px] flex-col gap-8 overflow-y-auto p-4">
        <div className="text-caption-2 rounded-[5px] bg-neutral-50 p-3 text-neutral-900">
          해당 정보는 채용 담당자에게만 공개되며, 현재 근무 중인 센터의
          담당자에게는 공개되지 않습니다.
        </div>
        <WorkRegionSection
          showLabel
          selectedDistricts={selectedDistricts}
          setSelectedDistricts={setSelectedDistricts}
        />
        <JobSeekingStatusSection status={status} setStatus={setStatus} />
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
        isFormValid={isFormValid}
        onClick={handleSubmit}
        onBack={() => router.back()}
      >
        등록
      </CompleteButton>
    </div>
  );
};

export default ProfileCreateDetailPage;
