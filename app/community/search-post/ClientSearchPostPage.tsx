"use client";

import SearchPostsHeader from "./components/SearchPostsHeader";
import { useSearchParams } from "next/navigation";
import { useSearchPosts } from "./hooks/useSearchPosts";
import { useRef, useState } from "react";
import PostCard from "@/app/components/post/PostCard";
import { usePostList } from "../hooks/usePostList";
import { Board } from "@/app/(main)/hooks/useUserProfile";
import { useSearchReset } from "./hooks/useSearchReset";
import { useFallbackPosts } from "./hooks/useFallbackPosts";
import { usePostAccumulator } from "../hooks/usePostAccumulator";
import { useSyncSearchOrFeedPage } from "./hooks/useSyncSearchOrFeedPage";
import { useSearchPostInfiniteScroll } from "./hooks/useSearchPostInfiniteScroll";
import { useScrollRestoration } from "@/app/lib/hooks/useScrollRestoration";
import { useSearchStore } from "./store/useSearchStore";

const ClientSearchPostPage = () => {
  const searchParams = useSearchParams();
  const { allSearchedPosts, appendSearchedPosts, searchPage, setSearchPage } =
    useSearchStore();
  const [allFallbackPosts, setAllFallbackPosts] = useState<Board[]>([]);
  const keyword = searchParams.get("keyword") ?? "";
  const initialPage = Number(searchParams.get("page") ?? "1");
  const [feedPage, setFeedPage] = useState(initialPage);

  const { data } = usePostList();
  const allPosts = data?.pages[data.pages.length - 1];
  const { data: searchedPosts } = useSearchPosts(keyword, searchPage);
  useSyncSearchOrFeedPage({
    keyword,
    searchPage,
    feedPage,
    searchParams,
    searchedPosts,
    setSearchPage,
    setFeedPage,
  });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null!);
  useScrollRestoration(scrollRef);

  useSearchReset({ keyword });
  useFallbackPosts({
    keyword,
    searchedPosts,
    allPosts,
    setAllFallbackPosts,
    feedPage,
  });
  useSearchPostInfiniteScroll({
    keyword,
    searchedPosts,
    allPosts,
    allFallbackPosts,
    lastElementRef,
    observerRef,
    searchPage,
    setSearchPage,
    setFeedPage,
  });
  usePostAccumulator({
    postList: searchedPosts?.boardList,
    setAllPosts: appendSearchedPosts,
  });

  return (
    <>
      <SearchPostsHeader keyword={keyword} />
      <main
        className="h-[calc(100dvh-46px-env(safe-area-inset-bottom))] overflow-y-auto bg-background-primary"
        ref={scrollRef}
      >
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
