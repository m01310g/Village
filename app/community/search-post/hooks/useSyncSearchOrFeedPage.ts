import { Board } from "@/app/(main)/hooks/useUserProfile";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect } from "react";
import { BoardListType } from "../../types/boardListType";

interface UseSyncSearchOrFeedPageOptions {
  keyword: string;
  searchPage: number;
  feedPage: number;
  searchParams: ReadonlyURLSearchParams;
  searchedPosts: BoardListType | undefined;
}

export const useSyncSearchOrFeedPage = ({
  keyword,
  searchPage,
  feedPage,
  searchParams,
  searchedPosts,
}: UseSyncSearchOrFeedPageOptions) => {
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (keyword) {
      params.set("page", String(searchPage));
    } else {
      params.set("page", String(feedPage));
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [searchPage, feedPage, keyword, searchParams, searchedPosts]);
};
