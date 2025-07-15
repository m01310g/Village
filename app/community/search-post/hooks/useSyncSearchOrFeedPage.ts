import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect } from "react";
import { BoardListType } from "../../types/boardListType";

interface UseSyncSearchOrFeedPageOptions {
  keyword: string;
  searchPage: number;
  feedPage: number;
  searchParams: ReadonlyURLSearchParams;
  searchedPosts: BoardListType | undefined;
  setSearchPage: (page: number) => void;
  setFeedPage: React.Dispatch<React.SetStateAction<number>>;
}

export const useSyncSearchOrFeedPage = ({
  keyword,
  searchPage,
  feedPage,
  searchParams,
  searchedPosts,
  setSearchPage,
  setFeedPage,
}: UseSyncSearchOrFeedPageOptions) => {
  useEffect(() => {
    const pageParam = Number(searchParams.get("page") ?? "1");

    if (keyword) {
      if (searchPage !== pageParam) {
        setSearchPage(pageParam);
      }
    } else {
      if (feedPage !== pageParam) {
        setFeedPage(pageParam);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, keyword]);

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
