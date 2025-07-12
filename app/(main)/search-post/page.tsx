"use client";

import SearchPostsHeader from "./components/SearchPostsHeader";
import { useSearchParams } from "next/navigation";
import { useSearchPosts } from "./hooks/useSearchPosts";
import { useCallback, useEffect, useRef } from "react";
import PostCard from "@/app/components/post/PostCard";

const SearchPostPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const { data: searchedPosts } = useSearchPosts(keyword, currentPage);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && searchedPosts && !searchedPosts.isLastPage) {
        const nextPage = currentPage + 1;
        const url = new URLSearchParams(searchParams.toString());
        url.set("page", nextPage.toString());
        window.history.replaceState(null, "", `?${url.toString()}`);
      }
    },
    [currentPage, searchedPosts, searchParams],
  );

  useEffect(() => {
    if (!lastElementRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 1,
    });
    observerRef.current.observe(lastElementRef.current);

    return () => observerRef.current?.disconnect();
  }, [handleIntersect, searchedPosts]);

  return (
    <>
      <SearchPostsHeader keyword={keyword} />
      <main className="h-[calc(100dvh-46px-env(safe-area-inset-bottom))] bg-background-primary">
        {searchedPosts.length > 0 ? (
          searchedPosts.map((post) => {
            const isMyProfile = post.isNeighbor === 4;
            return <PostCard post={post} isMyProfile={isMyProfile} />;
          })
        ) : (
          <div className="text-body-2 flex h-full flex-col items-center justify-center text-text-tertiary">
            <span>검색 결과가 없습니다.</span>
          </div>
        )}
      </main>
    </>
  );
};

export default SearchPostPage;
