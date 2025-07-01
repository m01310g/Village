"use client";

import Button from "@/app/components/Button";
import { useSetHeader } from "@/app/components/header/HeaderContext";
import WorkRegionSection from "@/app/profile/create/detail/components/WorkRegionSection";
import { useRegionFilterStore } from "@/store/useRegionFilterStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const RecruitSelectRegionPage = () => {
  const setHeader = useSetHeader();
  const resultCount = 300;
  const selectedDistricts = useRegionFilterStore(
    (state) => state.selectedDistricts,
  );
  const setSelectedDistricts = useRegionFilterStore(
    (state) => state.setSelectedDistricts,
  );
  const router = useRouter();

  useEffect(() => {
    setHeader({ title: "지역 조건 설정", showBackButton: true });
  }, [setHeader]);

  return (
    <main className="flex h-[calc(100vh-46px)] flex-col justify-between bg-background-primary px-4 py-5">
      <div className="flex w-full flex-col gap-3">
        <label className="text-title-3 text-text-primary">근무 지역</label>
        <WorkRegionSection
          showLabel={false}
          selectedDistricts={selectedDistricts}
          setSelectedDistricts={(value) =>
            setSelectedDistricts(
              typeof value === "function" ? value(selectedDistricts) : value,
            )
          }
        />
      </div>
      <Button
        color="primary"
        size="lg"
        disabled={Object.values(selectedDistricts).flat().length === 0}
        onClick={() => router.push("/recruit")}
      >{`${resultCount}건의 결과 보기`}</Button>
    </main>
  );
};

export default RecruitSelectRegionPage;
