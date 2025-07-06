"use client";

import Button from "@/app/components/Button";
import WorkRegionSection from "@/app/profile/create/detail/components/WorkRegionSection";
import { useRegionFilterStore } from "@/store/useRegionFilterStore";
import { useRouter } from "next/navigation";
import { useRecruitmentCount } from "../hooks/useRecruitmentCount";
import CountUp from "react-countup";
import { useSearchKeywordStore } from "@/store/useSearchKeywordStore";

const RecruitSelectRegionPage = () => {
  const selectedDistricts = useRegionFilterStore(
    (state) => state.selectedDistricts,
  );
  const setSelectedDistricts = useRegionFilterStore(
    (state) => state.setSelectedDistricts,
  );
  const router = useRouter();
  const { keyword } = useSearchKeywordStore();

  const { data: resultCount } = useRecruitmentCount(keyword);

  const handleRoute = () => {
    if (keyword) router.push(`/recruit?keyword=${keyword}`);
    else router.push("/recruit");
  };

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
        disabled={
          Object.values(selectedDistricts).flat().length === 0 && !!!keyword
        }
        onClick={handleRoute}
      >
        <CountUp end={resultCount ?? 0} duration={0.5} separator="," />
        건의 결과 보기
      </Button>
    </main>
  );
};

export default RecruitSelectRegionPage;
