"use client";

import { useEffect, useRef, useState } from "react";
import RecruitSearchBar from "./components/RecruitSearchBar";
import RegionFilterSettingBar from "./components/RegionFilterSettingBar";
import RecruitItem from "./components/RecruitItem";
import { useRegionFilterStore } from "@/store/useRegionFilterStore";
import SelectedRegions from "./components/SelectedRegions";
import { useRecruitmentList } from "./hooks/useRecruitmentList";
import PaginationBar from "./components/PaginationBar";

const RecruitPage = () => {
  const selectedDistricts = useRegionFilterStore(
    (state) => state.selectedDistricts,
  );
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const { data: recruits } = useRecruitmentList(page);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main
      className="text-title-1 flex h-[calc(100vh-46px-81px)] flex-col gap-3 overflow-y-auto bg-background-primary py-4 text-text-primary"
      ref={scrollContainerRef}
    >
      <div className="flex flex-col gap-3 px-4">
        <RecruitSearchBar keyword={keyword} setKeyword={setKeyword} />
        <div className="flex h-8 items-center gap-2">
          <h3 className="text-title-3 shrink-0 text-neutral-900">
            {recruits?.totalWebRecruitments}건
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
        {recruits?.webRecruitmentList.map((recruit, idx) => (
          <RecruitItem key={idx} recruit={recruit} />
        ))}
        {recruits && recruits.totalPages > 1 && (
          <PaginationBar
            totalPages={recruits.totalPages}
            currentPage={page}
            onClickPage={handlePageClick}
          />
        )}
      </div>
    </main>
  );
};

export default RecruitPage;
