"use client";

import { useEffect, useRef, useState } from "react";
import RecruitSearchBar from "./components/RecruitSearchBar";
import RegionFilterSettingBar from "./components/RegionFilterSettingBar";
import RecruitItem from "./components/RecruitItem";
import { useRegionFilterStore } from "@/store/useRegionFilterStore";
import SelectedRegions from "./components/SelectedRegions";

const RecruitPage = () => {
  const recruitCount = 17;
  const selectedDistricts = useRegionFilterStore(
    (state) => state.selectedDistricts,
  );

  const [keyword, setKeyword] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <main className="text-title-1 flex h-[calc(100vh-46px-81px)] flex-col gap-3 bg-background-primary py-4 text-text-primary">
      <div className="flex flex-col gap-3 px-4">
        <RecruitSearchBar keyword={keyword} setKeyword={setKeyword} />
        <div className="flex h-8 items-center gap-2">
          <h3 className="text-title-3 w-[30px] shrink-0 text-neutral-900">
            {recruitCount}건
          </h3>
          {Object.keys(selectedDistricts).length > 0 && (
            <>
              <div className="h-8 w-[1px] bg-border-primary" />
              <div
                className="flex w-full gap-1 overflow-x-auto scrollbar-none"
                ref={scrollRef}
              >
                {Object.entries(selectedDistricts).flatMap(
                  ([sido, districts]) =>
                    districts.map((district, i) => (
                      <SelectedRegions
                        key={i}
                        sido={sido}
                        district={district}
                      />
                    )),
                )}
              </div>
            </>
          )}
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
