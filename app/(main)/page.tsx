"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useSetHeader } from "../components/header/HeaderContext";
import FilteringButton from "../components/feed/FilteringButton";
import PostCard from "../components/post/PostCard";
import FloatingButton from "../components/post/FloatingButton";
import { usePostList } from "./hooks/usePostList";
import { useScrollRestoration } from "../lib/hooks/useScrollRestoration";
import { usePathname } from "next/navigation";
import { useScrollStore } from "@/store/useScrollStore";
import { Board } from "../profile/hooks/useUserProfile";

const Page = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { getActiveFilter, setActiveFilter: saveActiveFilter } =
    useScrollStore();
  const pathname = usePathname();

  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState(
    () => getActiveFilter(pathname) || "전체",
  );

  const [allPosts, setAllPosts] = useState<Board[]>([]);
  const { data: postList } = usePostList(page);

  useEffect(() => {
    if (postList?.boardList) {
      setAllPosts((prev) => [...prev, ...postList.boardList]);
    }
  }, [postList]);
  useScrollRestoration(scrollRef, activeFilter);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(page));
    const newUrl = `${pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [page]);

  const setHeader = useSetHeader();

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

  const filters = ["전체", "업계이야기", "채용", "교육"];

  const filteredPosts =
    activeFilter === "전체"
      ? allPosts
      : allPosts.filter((post) => {
          const typeIndex = filters.indexOf(activeFilter) - 1;
          return post.type === typeIndex;
        });

  const loadNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first.isIntersecting) return;

        if (page === 1 && allPosts.length === 0) return;

        if (!postList?.isLastPage) {
          loadNextPage();
        }
      },
      { threshold: 0.5, root: scrollRef.current },
    );

    const current = loaderRef.current;

    const timeout = setTimeout(() => {
      if (current && !postList?.isLastPage) {
        observer.observe(current);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (current) observer.unobserve(current);
    };
  }, [loadNextPage, postList?.isLastPage, activeFilter, page, allPosts.length]);

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
        <div ref={loaderRef} className="invisible h-[1px] w-full" />
      </div>
      <div className="fixed bottom-[81px] left-1/2 z-40 flex w-full max-w-[375px] -translate-x-1/2 px-4 pb-4">
        <FloatingButton />
      </div>
    </div>
  );
};

export default Page;
