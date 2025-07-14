"use client";

import SearchPostsHeader from "./components/SearchPostsHeader";
import { useSearchParams } from "next/navigation";
import { useSearchPosts } from "./hooks/useSearchPosts";
import { useEffect, useRef, useState } from "react";
import PostCard from "@/app/components/post/PostCard";
import { usePostList } from "../hooks/usePostList";
import { Board } from "@/app/(main)/hooks/useUserProfile";

const ClientSearchPostPage = () => {
  const [searchPage, setSearchPage] = useState(1);
  const [feedPage, setFeedPage] = useState(1);
  const searchParams = useSearchParams();
  const [allSearchedPosts, setAllSearchedPosts] = useState<Board[]>([]);
  const [allFallbackPosts, setAllFallbackPosts] = useState<Board[]>([]);
  const keyword = searchParams.get("keyword") ?? "";

  const { data: allPosts } = usePostList(feedPage);
  const { data: searchedPosts } = useSearchPosts(keyword, searchPage);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (keyword) {
      params.set("page", String(searchPage));
    } else {
      params.set("page", String(feedPage));
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [searchPage, feedPage, keyword, searchParams, searchedPosts]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSearchPage(1);
    setAllSearchedPosts([]);
  }, [keyword]);

  useEffect(() => {
    const noSearchResults = keyword && searchedPosts?.boardList?.length === 0;

    const shouldShowFallback =
      (!keyword && allPosts?.boardList?.length) ||
      (keyword &&
        (searchedPosts === undefined || noSearchResults) &&
        allPosts?.boardList?.length);

    if (shouldShowFallback) {
      setAllFallbackPosts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const newPosts = allPosts.boardList.filter((p) => !ids.has(p.id));
        return [...prev, ...newPosts];
      });
    }
  }, [allPosts, keyword, searchedPosts, feedPage]);

  useEffect(() => {
    if (!lastElementRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;

        const hasKeyword = !!keyword;
        const hasSearchResults = (searchedPosts?.boardList?.length ?? 0) > 0;
        const hasNoResults =
          searchedPosts !== undefined && searchedPosts.boardList.length === 0;

        const isSearchingButNoResult = hasKeyword && hasNoResults;

        const isFallbackMode =
          (!hasKeyword || isSearchingButNoResult) &&
          !allPosts?.isLastPage &&
          allFallbackPosts.length > 0;

        if (hasKeyword && hasSearchResults && !searchedPosts?.isLastPage) {
          setSearchPage((prev) => prev + 1);
        } else if (isFallbackMode) {
          setFeedPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    observerRef.current.observe(lastElementRef.current);

    return () => observerRef.current?.disconnect();
  }, [
    keyword,
    searchedPosts?.isLastPage,
    searchedPosts?.boardList?.length,
    allFallbackPosts.length,
    allPosts?.isLastPage,
    searchedPosts,
  ]);

  useEffect(() => {
    if (searchedPosts?.boardList) {
      setAllSearchedPosts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const newPosts = searchedPosts.boardList.filter((p) => !ids.has(p.id));
        return [...prev, ...newPosts];
      });
    }
  }, [searchedPosts]);

  return (
    <>
      <SearchPostsHeader keyword={keyword} />
      <main className="h-[calc(100dvh-46px-env(safe-area-inset-bottom))] overflow-y-auto bg-background-primary">
        {keyword ? (
          allSearchedPosts.length > 0 ? (
            allSearchedPosts.map((post) => (
              <PostCard
                key={`search-${post.id}`}
                post={post}
                isMyProfile={post.isNeighbor === 4}
              />
            ))
          ) : (
            <>
              <div className="text-body-2 flex flex-col items-center justify-center px-4 py-5 text-text-tertiary">
                <span>입력한 검색 결과가 없어요.</span>
                <span>아래 다른 글은 어떠신가요?</span>
              </div>
              <div className="h-1 w-full bg-border-primary" />
              {allFallbackPosts.map((post) => (
                <PostCard
                  key={`fallback-${post.id}`}
                  post={post}
                  isMyProfile={post.isNeighbor === 4}
                />
              ))}
            </>
          )
        ) : null}
        <div ref={lastElementRef} className="invisible h-[1px] w-full" />
      </main>
    </>
  );
};

export default ClientSearchPostPage;
