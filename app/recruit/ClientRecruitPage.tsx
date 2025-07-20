"use client";

import { useEffect, useRef, useState } from "react";
import RecruitSearchBar from "./components/RecruitSearchBar";
import RegionFilterSettingBar from "./components/RegionFilterSettingBar";
import RecruitItem from "./components/RecruitItem";
import { useRegionFilterStore } from "@/store/useRegionFilterStore";
import SelectedRegions from "./components/SelectedRegions";
import { useRecruitmentList } from "./hooks/useRecruitmentList";
import PaginationBar from "./components/PaginationBar";
import { useRecruitmentFilter } from "./hooks/useRecruitmentFilter";
import { useRouter, useSearchParams } from "next/navigation";
import CountUp from "react-countup";
import { useScrollRestoration } from "../lib/hooks/useScrollRestoration";
import { useSearchKeywordStore } from "@/store/useSearchKeywordStore";

const ClientRecruitPage = () => {
  const selectedDistricts = useRegionFilterStore(
    (state) => state.selectedDistricts,
  );
  const searchParams = useSearchParams();
  const keywordParam = searchParams.get("keyword") ?? "";
  const { keyword, setKeyword } = useSearchKeywordStore();

  useEffect(() => {
    if (keywordParam !== keyword) {
      setKeyword(keywordParam);
    }
  }, [keywordParam, keyword, setKeyword]);

  const pageParam = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageParam);
  const { data: recruits } = useRecruitmentList(page);
  const { data: filteredRecruits } = useRecruitmentFilter(keyword, page);
  const router = useRouter();

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newPage = Number(searchParams.get("page")) || 1;
    setPage(newPage);
  }, [searchParams]);

  useScrollRestoration(scrollContainerRef);

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
    router.push(
      `/recruit?page=${pageNumber}${keyword ? `&keyword=${keyword}` : ""}`,
    );
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasFilters =
    keyword.trim() !== "" || Object.values(selectedDistricts).flat().length > 0;

  const recruitListToRender = hasFilters
    ? (filteredRecruits?.webRecruitmentList ?? [])
    : (recruits?.webRecruitmentList ?? []);
  const totalRecruitments = hasFilters
    ? filteredRecruits?.totalWebRecruitments
    : recruits?.totalWebRecruitments;
  const totalPages = hasFilters
    ? filteredRecruits?.totalPages
    : recruits?.totalPages;

  return (
    <main
      className="flex h-[calc(100dvh-81px-46px-env(safe-area-inset-bottom))] max-w-[500px] flex-col gap-3 overflow-y-auto bg-background-primary py-4 text-text-primary scrollbar-thin"
      ref={scrollContainerRef}
    >
      <div className="flex flex-col gap-3 px-4">
        <RecruitSearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          onClick={() => router.push("/recruit/search-center")}
        />
        <div className="flex h-8 items-center gap-2">
          <h3 className="text-title-3 shrink-0 text-neutral-900">
            <CountUp
              end={totalRecruitments ?? 0}
              duration={0.6}
              separator=","
            />
            건
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
        {recruitListToRender.length === 0 ? (
          <div className="justify-center py-10 text-center text-text-secondary">
            조건에 맞는 채용공고가 없습니다.
          </div>
        ) : (
          recruitListToRender.map((recruit, idx) => (
            <RecruitItem
              key={idx}
              recruit={recruit}
              onClick={() =>
                router.push(
                  `/recruit/${recruit.id}?page=${page}${keyword ? `&keyword=${keyword}` : ""}`,
                )
              }
            />
          ))
        )}
        {totalPages === 0 ? (
          <></>
        ) : (
          totalPages && (
            <PaginationBar
              totalPages={totalPages}
              currentPage={page}
              onClickPage={handlePageClick}
            />
          )
        )}
      </div>
    </main>
  );
};

export default ClientRecruitPage;
