"use client";

import { useEffect, useState } from "react";
import { useSetHeader } from "../components/header/HeaderContext";
import RecruitSearchBar from "./components/RecruitSearchBar";
import RegionFilterSettingBar from "./components/RegionFilterSettingBar";

const RecruitPage = () => {
  const setHeader = useSetHeader();
  const recruitCount = 17;
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setHeader({ title: "채용 공고", showBackButton: true });
  }, [setHeader]);

  return (
    <main className="text-title-1 flex h-[calc(100vh-46px-81px)] flex-col gap-3 bg-background-primary text-text-primary">
      <div className="flex flex-col gap-3 p-4">
        <RecruitSearchBar keyword={keyword} setKeyword={setKeyword} />
        <h3 className="text-title-3 text-neutral-900">{recruitCount}건</h3>
      </div>
      <div className="flex flex-col">
        <RegionFilterSettingBar
          selectedDistricts={selectedDistricts}
          setSelectedDistricts={setSelectedDistricts}
        />
      </div>
    </main>
  );
};

export default RecruitPage;
