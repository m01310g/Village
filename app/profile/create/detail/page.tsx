"use client";

import { useRouter } from "next/navigation";
import CompleteButton from "./components/CompleteButton";
import { useProfileFormStore } from "@/store/useProfileFormStore";
import WorkRegionSection from "./components/WorkRegionSection";
import JobSeekingStatusSection from "./components/JobSeekingStatusSection";
import { useEffect, useState } from "react";
import PhoneNumberSection from "./components/PhoneNumberSection";
import PhoneNumberVisibilitySection from "./components/PhoneNumberVisibilitySeciton";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { convertStatusToNumber } from "../../utils/formUtils";

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
    console.log(formData);
    try {
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/registerWebProfile`,
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
        } else if (error.statusCode === 409) {
          throw new Error(`이미 등록된 프로필이 있습니다: ${error.message}`);
        } else {
          throw new Error(error.message);
        }
      }

      router.replace(`/profile`);
    } catch (err) {
      console.error(err instanceof Error ? err.message : "알 수 없는 오류");
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
      <CompleteButton isFormValid={isFormValid} onClick={handleSubmit}>
        등록
      </CompleteButton>
    </div>
  );
};

export default ProfileCreateDetailPage;
