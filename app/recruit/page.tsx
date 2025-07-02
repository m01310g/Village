"use client";

import { useState } from "react";
import RecruitSearchBar from "./components/RecruitSearchBar";
import RegionFilterSettingBar from "./components/RegionFilterSettingBar";
import RecruitItem from "./components/RecruitItem";
import { useRegionFilterStore } from "@/store/useRegionFilterStore";

const RecruitPage = () => {
  const recruitCount = 17;
  const selectedDistricts = useRegionFilterStore(
    (state) => state.selectedDistricts,
  );
  const setSelectedDistricts = useRegionFilterStore(
    (state) => state.setSelectedDistricts,
  );
  const [keyword, setKeyword] = useState("");

  return (
    <main className="text-title-1 flex h-[calc(100vh-46px-81px)] flex-col gap-3 bg-background-primary py-4 text-text-primary">
      <div className="flex flex-col gap-3 px-4">
        <RecruitSearchBar keyword={keyword} setKeyword={setKeyword} />
        <div className="flex gap-2">
          <h3 className="text-title-3 text-neutral-900">{recruitCount}건</h3>
          <div></div>
        </div>
      </div>
      <div className="flex flex-col">
        <RegionFilterSettingBar />
        <RecruitItem
          centerName="에이블짐 서초점"
          location="서울시 서초구"
          workFormat={["계약직"]}
          workTime={["자유근무", "오전 파트타임"]}
        />
      </div>
    </main>
  );
};

export default RecruitPage;
