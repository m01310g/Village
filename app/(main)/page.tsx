"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useSetHeader } from "../components/header/HeaderContext";
import FilteringButton from "../components/feed/FilteringButton";
import PostCard from "../components/post/PostCard";
import FloatingButton from "../components/post/FloatingButton";
import { usePostList } from "./hooks/usePostList";
import { useScrollRestoration } from "../lib/hooks/useScrollRestoration";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useScrollStore } from "@/store/useScrollStore";

const Page = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { getActiveFilter, setActiveFilter: saveActiveFilter } =
    useScrollStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page") ?? 1);
  const [activeFilter, setActiveFilter] = useState(
    () => getActiveFilter(pathname) || "전체",
  );

  const { data: postList } = usePostList(page);

  useScrollRestoration(scrollRef, activeFilter);

  const setHeader = useSetHeader();
  const filters = ["전체", "업계이야기", "채용", "교육"];

  useEffect(() => {
    setHeader({
      title: "",
      showBackButton: false,
      showSearchButton: true,
      showSettingButton: false,
      showLogo: true,
    });
  }, [setHeader]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    saveActiveFilter(pathname, filter);
  };

  const filteredPosts =
    activeFilter === "전체"
      ? postList?.boardList
      : postList?.boardList.filter((post) => {
          const typeIndex = filters.indexOf(activeFilter) - 1;
          return post.type === typeIndex;
        });

  const loadNextPage = useCallback(() => {
    const nextPage = page + 1;
    router.push(`?page=${nextPage}`, { scroll: false });
  }, [page, router]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadNextPage();
        }
      },
      { threshold: 1 },
    );
    const current = loaderRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadNextPage]);

  return (
    <div className="flex h-full max-w-[375px] flex-col">
      <div className="flex w-full max-w-[375px] gap-1 bg-background-primary px-4 py-3">
        {filters.map((filter, i) => (
          <FilteringButton
            key={i}
            content={filter}
            isActive={activeFilter === filter}
            onClick={() => handleFilterChange(filter)}
          />
        ))}
      </div>
      <div
        className="h-[calc(100dvh-81px-100px-env(safe-area-inset-bottom))] overflow-y-auto scrollbar-thin"
        ref={scrollRef}
      >
        {filteredPosts &&
          filteredPosts.map((post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                isMyProfile={post.isNeighbor === 4}
              />
            );
          })}
        <div ref={loaderRef} className="h-2" />
      </div>
      <div className="fixed bottom-[81px] left-1/2 z-40 flex w-full max-w-[375px] -translate-x-1/2 px-4 pb-4">
        <FloatingButton />
      </div>
    </div>
  );
};

export default Page;
