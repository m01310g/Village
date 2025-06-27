"use client";

import { useRouter } from "next/navigation";
import CompleteButton from "./components/CompleteButton";
import { useProfileFormStore } from "@/store/useProfileFormStore";
import WorkRegionSection from "./components/WorkRegionSection";
import JobSeekingStatusSection from "./components/JobSeekingStatusSection";
import { useState } from "react";
import PhoneNumberSection from "./components/PhoneNumberSection";
import PhoneNumberVisibilitySection from "./components/PhoneNumberVisibilitySeciton";

const ProfileCreateDetailPage = () => {
  const router = useRouter();
  const { formData } = useProfileFormStore();
  const [status, setStatus] = useState("구직 상태 선택");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  const isFormValid = false;

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
        <PhoneNumberSection />
        <PhoneNumberVisibilitySection />
      </form>
      <CompleteButton isFormValid={isFormValid} formData={formData} />
    </div>
  );
};

export default ProfileCreateDetailPage;
