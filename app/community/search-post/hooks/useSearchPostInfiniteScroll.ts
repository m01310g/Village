import { RefObject, useEffect } from "react";
import { BoardListType } from "../../types/boardListType";
import { Board } from "@/app/(main)/hooks/useUserProfile";

interface UseSearchPostInfiteScroll {
  keyword: string;
  searchedPosts: BoardListType | undefined;
  allPosts: BoardListType | undefined;
  allFallbackPosts: Board[];
  lastElementRef: RefObject<HTMLElement | null>;
  observerRef: RefObject<IntersectionObserver | null>;
  searchPage: number;
  setSearchPage: (page: number) => void;
  setFeedPage: React.Dispatch<React.SetStateAction<number>>;
}

export const useSearchPostInfiniteScroll = ({
  keyword,
  searchedPosts,
  allPosts,
  allFallbackPosts,
  lastElementRef,
  observerRef,
  searchPage,
  setSearchPage,
  setFeedPage,
}: UseSearchPostInfiteScroll) => {
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
          setSearchPage(searchPage + 1);
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
    lastElementRef,
    observerRef,
  ]);
};
