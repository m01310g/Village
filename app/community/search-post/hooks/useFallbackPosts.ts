import { Board } from "@/app/(main)/hooks/useUserProfile";
import { useEffect } from "react";
import { BoardListType } from "../../types/boardListType";

interface UseFallbackPostsOptions {
  keyword: string;
  searchedPosts: BoardListType | undefined;
  allPosts: BoardListType | undefined;
  setAllFallbackPosts: React.Dispatch<React.SetStateAction<Board[]>>;
  feedPage: number;
}

export const useFallbackPosts = ({
  keyword,
  searchedPosts,
  allPosts,
  setAllFallbackPosts,
  feedPage,
}: UseFallbackPostsOptions) => {
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
};
